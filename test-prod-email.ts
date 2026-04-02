import fetch from 'node-fetch';

async function testProd() {
  try {
    console.log("Sending request to production API...");
    const res = await fetch('https://aviationonline-production.up.railway.app/api/send-quiz-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userEmail: 'haltoclop@gmail.com',
        userName: 'Test User Prod',
        quizTitle: 'Test Quiz',
        score: 5,
        totalQuestions: 10,
        percentage: 50
      })
    });
    
    const text = await res.text();
    console.log("Response Status:", res.status);
    console.log("Response Body:", text);
  } catch (err) {
    console.error("Error:", err);
  }
}

testProd();
