import vision from '@google-cloud/vision';


const client = new vision.ImageAnnotatorClient({
  keyFilename: '../server/services/google-vision-api.json',
});

async function getDescription(imagePath) {
  try {
    const [result] = await client.labelDetection(imagePath);
    const labels = result.labelAnnotations;
    return labels.map(label => label.description).join(', ');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getDescription;