// 

import vision from '@google-cloud/vision';

// 使用绝对路径
const client = new vision.ImageAnnotatorClient({
  keyFilename: '/Users/xuzhenke/Documents/MyProjects/ProjectX/server/services/smart-exchange-425608-q6-3ee43627a14f.json',
});

/**
 * 获取提供图片的描述
 * @param {string} imagePath - 图片文件的路径
 * @returns {Promise<string>} - 解析为描述字符串的 Promise
 */
async function getDescription(imagePath) {
  try {
    const [result] = await client.labelDetection(imagePath);
    const labels = result.labelAnnotations;
    const description = labels.map(label => label.description).join(', ');
    return description;
  } catch (error) {
    console.error('标签检测过程中出错:', error);
    throw error;
  }
}

export default getDescription;