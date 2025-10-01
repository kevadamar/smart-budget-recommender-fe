# Deployment Guide

This guide covers deploying the Smart Budget Recommendation application to your private server using GitHub Actions CI/CD.

## Prerequisites

- Private server with SSH access
- Node.js 18+ installed on your local machine
- GitHub repository with Actions enabled
- Web server (Nginx/Apache) configured on your server

## GitHub Actions CI/CD Setup

### 1. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SERVER_HOST` | Your server IP or domain | `192.168.1.100` or `example.com` |
| `SERVER_USERNAME` | SSH username | `ubuntu` or `deploy` |
| `SSH_PRIVATE_KEY` | SSH private key for authentication | Contents of `~/.ssh/id_rsa` |
| `SERVER_PORT` | SSH port (optional, default: 22) | `22` |
| `SERVER_DEPLOY_PATH` | Absolute path on server | `/var/www/smart-budget` |

### 2. Generate SSH Key Pair

If you don't have an SSH key:

```bash
# On your local machine
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy"

# Copy public key to server
ssh-copy-id -i ~/.ssh/id_rsa.pub user@your-server

# Copy private key content for GitHub secret
cat ~/.ssh/id_rsa
```

### 3. Prepare Server

```bash
# SSH into your server
ssh user@your-server

# Create deployment directory
sudo mkdir -p /var/www/smart-budget
sudo chown $USER:$USER /var/www/smart-budget

# Create temp directory
mkdir -p /var/www/smart-budget/temp
```

### 4. Configure Web Server

#### Nginx Configuration

Create `/etc/nginx/sites-available/smart-budget`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/smart-budget/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/smart-budget /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Apache Configuration

Create `/etc/apache2/sites-available/smart-budget.conf`:

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/smart-budget/dist

    <Directory /var/www/smart-budget/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted

        # Enable rewrite for SPA
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
    </IfModule>
</VirtualHost>
```

Enable the site:

```bash
sudo a2ensite smart-budget
sudo a2enmod rewrite
sudo systemctl reload apache2
```

## Deployment Workflow

### Automatic Deployment

1. Push to `main` or `master` branch:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

2. GitHub Actions will automatically:
   - Install dependencies
   - Run linter
   - Build production bundle
   - Deploy to your server
   - Create backup of previous deployment

3. Monitor deployment: Go to GitHub → Actions tab

### Manual Deployment

Using the deployment script:

```bash
# Local: Build and create package
./deploy.sh local

# Transfer to server
scp dist.tar.gz user@server:/var/www/smart-budget/

# Server: Deploy
ssh user@server
cd /var/www/smart-budget
./deploy.sh server
```

### Manual Trigger

Trigger deployment manually from GitHub:
- Go to Actions → Deploy to Private Server → Run workflow

## Environment Variables

If your application needs environment variables, create `.env.production`:

```bash
VITE_API_URL=https://api.your-domain.com
VITE_APP_NAME=Smart Budget
```

Add to build step in `.github/workflows/deploy.yml`:

```yaml
- name: Build production bundle
  run: npm run build
  env:
    NODE_ENV: production
    VITE_API_URL: ${{ secrets.VITE_API_URL }}
```

## Rollback

If deployment fails, restore from backup:

```bash
# SSH into server
cd /var/www/smart-budget/backups

# List backups
ls -lh

# Restore backup
tar -xzf backup_YYYYMMDD_HHMMSS.tar.gz -C /var/www/smart-budget

# Reload web server
sudo systemctl reload nginx
```

## Troubleshooting

### Deployment fails with SSH error

- Verify SSH_PRIVATE_KEY secret is correct (entire key including BEGIN/END lines)
- Check server firewall allows SSH from GitHub Actions IPs
- Test SSH connection manually: `ssh -i key.pem user@server`

### Build succeeds but site shows old version

- Clear browser cache (Ctrl+Shift+R)
- Check deployment path is correct
- Verify web server is pointing to correct directory
- Check file permissions: `ls -la /var/www/smart-budget/dist`

### 404 errors on page refresh

- Ensure web server has SPA rewrite rules configured
- Check `try_files` directive in Nginx or `RewriteRule` in Apache

## Security Recommendations

1. Use HTTPS (Let's Encrypt):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

2. Restrict SSH access in server firewall
3. Use GitHub environment protection rules for production
4. Enable branch protection on main/master branch
5. Rotate SSH keys regularly

## Monitoring

Add health check endpoint to your deployment:

```bash
# Create health check file
echo "OK" > /var/www/smart-budget/dist/health

# Test
curl https://your-domain.com/health
```

Add to GitHub Actions:

```yaml
- name: Health check
  run: |
    sleep 5
    curl -f https://your-domain.com/health || exit 1
```
