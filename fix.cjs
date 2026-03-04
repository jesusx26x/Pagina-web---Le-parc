const fs = require('fs');

const items = ['BentoGrid.js', 'GallerySection.js', 'HeroSection.js', 'Navigation.js'];

items.forEach(file => {
    const path = 'src/components/' + file;
    let content = fs.readFileSync(path, 'utf8');

    // Replace '/images/...' -> import.meta.env.BASE_URL + 'images/...'
    content = content.replace(/'\/images\//g, "import.meta.env.BASE_URL + 'images/");
    content = content.replace(/'\/videos\//g, "import.meta.env.BASE_URL + 'videos/");
    content = content.replace(/\"\/images\//g, 'import.meta.env.BASE_URL + "images/');
    content = content.replace(/\"\/videos\//g, 'import.meta.env.BASE_URL + "videos/');

    fs.writeFileSync(path, content);
    console.log('Fixed ' + file);
});
