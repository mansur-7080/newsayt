/**
 * Serverless Function - Rasm qayta ishlash
 * Avtomatik masshtablanuvchi bulut funksiyasi
 */

// AWS Lambda handler
exports.handler = async (event, context) => {
  console.log('Event received:', JSON.stringify(event, null, 2));
  
  try {
    // S3 event'dan rasm ma'lumotlarini olish
    const records = event.Records || [];
    const results = [];

    for (const record of records) {
      if (record.eventName.startsWith('ObjectCreated')) {
        const result = await processImage(record);
        results.push(result);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Rasmlar muvaffaqiyatli qayta ishlandi',
        processedCount: results.length,
        results
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};

// Vercel/Next.js API route
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageUrl, operations } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'imageUrl majburiy' });
    }

    const result = await processImageFromUrl(imageUrl, operations);
    
    res.status(200).json({
      success: true,
      result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// Google Cloud Function
exports.processImage = async (req, res) => {
  // CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
    return;
  }

  try {
    const { imageData, format = 'jpeg', quality = 80 } = req.body;
    
    const processed = await processBase64Image(imageData, {
      format,
      quality
    });

    res.status(200).json({
      success: true,
      processedImage: processed,
      metadata: {
        format,
        quality,
        processedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Rasm qayta ishlash funksiyalari
async function processImage(s3Record) {
  const bucket = s3Record.s3.bucket.name;
  const key = decodeURIComponent(s3Record.s3.object.key.replace(/\+/g, ' '));
  const size = s3Record.s3.object.size;

  console.log(`Processing image: ${bucket}/${key} (${size} bytes)`);

  // Turli o'lchamlar yaratish
  const sizes = [
    { name: 'thumbnail', width: 150, height: 150 },
    { name: 'small', width: 300, height: 300 },
    { name: 'medium', width: 600, height: 600 },
    { name: 'large', width: 1200, height: 1200 }
  ];

  const results = [];

  for (const size of sizes) {
    // Mock implementation - real implementatsiyada sharp yoki jimp kutubxonasi ishlatiladi
    const processed = {
      originalKey: key,
      processedKey: `processed/${size.name}/${key}`,
      size: size,
      processedAt: new Date().toISOString()
    };

    results.push(processed);
    
    // SQS/SNS orqali xabar yuborish
    await notifyProcessingComplete(processed);
  }

  return {
    originalImage: `s3://${bucket}/${key}`,
    processedImages: results
  };
}

async function processImageFromUrl(imageUrl, operations = []) {
  console.log(`Processing image from URL: ${imageUrl}`);
  
  // Default operatsiyalar
  const defaultOperations = [
    { type: 'resize', width: 800, height: 600 },
    { type: 'optimize', quality: 85 },
    { type: 'format', format: 'webp' }
  ];

  const ops = operations.length > 0 ? operations : defaultOperations;

  // Mock result
  return {
    originalUrl: imageUrl,
    processedUrl: `https://cdn.example.com/processed/${Date.now()}.webp`,
    operations: ops,
    processingTime: Math.random() * 1000 + 500, // 500-1500ms
    savedBytes: Math.floor(Math.random() * 100000) + 50000
  };
}

async function processBase64Image(base64Data, options) {
  // Base64 validatsiya
  if (!base64Data || !base64Data.match(/^data:image\/\w+;base64,/)) {
    throw new Error('Noto\'g\'ri base64 rasm formati');
  }

  // Mock processing
  return {
    processed: base64Data, // Real implementatsiyada qayta ishlangan rasm
    size: Buffer.from(base64Data.split(',')[1], 'base64').length,
    format: options.format,
    quality: options.quality
  };
}

async function notifyProcessingComplete(result) {
  // SNS/SQS/EventBridge orqali xabar yuborish
  console.log('Notifying processing complete:', result);
  
  // Mock implementation
  return Promise.resolve();
}

// Serverless framework uchun config
module.exports.config = {
  runtime: 'nodejs18.x',
  memorySize: 1024,
  timeout: 30,
  environment: {
    BUCKET_NAME: process.env.BUCKET_NAME,
    CDN_URL: process.env.CDN_URL
  },
  events: [
    {
      s3: {
        bucket: 'user-uploads',
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: 'uploads/',
            suffix: '.jpg'
          },
          {
            prefix: 'uploads/',
            suffix: '.png'
          }
        ]
      }
    },
    {
      http: {
        path: 'process-image',
        method: 'post',
        cors: true
      }
    }
  ]
}; 