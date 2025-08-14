# Deployment Guide - VisionLab Maintenance Page

## Quick Deploy Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts and your site will be live in minutes
```

### 2. Netlify
```bash
# Build the project
npm run build

# Drag and drop the 'dist' folder to Netlify
# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --dir=dist --prod
```

### 3. GitHub Pages
```bash
# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Install gh-pages
npm install -D gh-pages

# Deploy
npm run deploy
```

### 4. AWS S3 + CloudFront
1. Build the project: `npm run build`
2. Upload `dist` folder contents to S3 bucket
3. Configure CloudFront for CDN
4. Set up custom domain (optional)

### 5. Any Static Hosting Service
- Build: `npm run build`
- Upload the contents of the `dist` folder to your hosting service

## Environment Variables (if needed)

Create a `.env` file for any API endpoints:
```env
VITE_CONTACT_API_URL=your-api-endpoint
```

## Custom Domain Setup

1. Point your domain's DNS to your hosting provider
2. Configure SSL certificate (usually automatic)
3. Update the site title and meta tags in `index.html` if needed

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] Contact form works (if connected to backend)
- [ ] All animations work smoothly
- [ ] Mobile responsiveness tested
- [ ] SEO meta tags are correct
- [ ] Performance is good (check Lighthouse)

## Maintenance Mode

When your main website is ready:
1. Replace this maintenance page with your full website
2. Or redirect the domain to your new site
3. Keep this code as a backup for future maintenance periods

## Support

For deployment issues, check:
- Build logs for errors
- Hosting provider documentation
- Network connectivity
- Domain DNS settings
