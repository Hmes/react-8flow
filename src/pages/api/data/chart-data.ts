import { NextApiRequest, NextApiResponse } from 'next';

let nextResponseCode: 200 | 500 = 200;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqBody = JSON.parse(req.body)
  const minValue = reqBody.minValue;
  const maxValue = reqBody.maxValue;
  
  const filterData = (data: number[]) => {
    return data.filter(value => 
      (minValue === '' || value >= minValue) && 
      (maxValue === '' || value <= maxValue)
    );
  };

  if (req.method === 'POST') {
    if (nextResponseCode === 500 && (minValue || maxValue)) {
      nextResponseCode = 200;
      res.json({
        status: 'error',
        message: 'Something went wrong',
      });
      return;
    }
    nextResponseCode = 500;
    res.json({
      data: { 
        datasetOne: filterData([75, -30, -45, -90, 20, 30]), 
        datasetTwo: filterData([15, -15, 25, -60, 80, 90]) 
      },
      status: 'success',
      message: 'Success!',
    });
    return;
  }

  res.status(400).end();
}
