const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

const galleryDir = path.join(__dirname, '../public/gallery');

async function convertHeicToJpg(heicPath) {
  try {
    console.log(`Converting ${path.basename(heicPath)}...`);

    const inputBuffer = await fs.promises.readFile(heicPath);

    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.9
    });

    const jpgPath = heicPath.replace(/\.HEIC$/i, '.jpg');
    await fs.promises.writeFile(jpgPath, outputBuffer);

    console.log(`✓ Created ${path.basename(jpgPath)}`);

    // Delete the original HEIC file
    await fs.promises.unlink(heicPath);
    console.log(`✓ Removed ${path.basename(heicPath)}`);

    return jpgPath;
  } catch (error) {
    console.error(`Error converting ${heicPath}:`, error.message);
    return null;
  }
}

async function convertAllHeicFiles() {
  try {
    const files = await fs.promises.readdir(galleryDir);
    const heicFiles = files.filter(file => file.toLowerCase().endsWith('.heic'));

    console.log(`Found ${heicFiles.length} HEIC files to convert\n`);

    for (const file of heicFiles) {
      const heicPath = path.join(galleryDir, file);
      await convertHeicToJpg(heicPath);
      console.log('');
    }

    console.log('All conversions complete!');
  } catch (error) {
    console.error('Error reading gallery directory:', error);
  }
}

convertAllHeicFiles();
