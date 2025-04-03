import React, { useState } from "react";

const App = () => {
  const [vision, setVision] = useState(null);
  const [auditory, setAuditory] = useState(null);
  const [physical, setPhysical] = useState(null);
  const [self_, setSelf] = useState(null);
  const [communication, setCommunication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const apiUrl = "https://706a-34-173-86-218.ngrok-free.app/calc";

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}?vision=${vision}&auditory=${auditory}&physical=${physical}&self=${self_}&communication=${communication}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'  // ngrok 경고 페이지를 생략
        }
      });
      // 응답 내용 확인
      const textResponse = await response.text();
      console.log("Response Text:", textResponse);  // 응답 텍스트 출력
  
      // JSON 파싱 시도
      const data = JSON.parse(textResponse);
      console.log(data);
      setResult(data.result);
    } catch (error) {
      console.error("Error calling the API:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h1>노인의 삶의 질 예측</h1>
      <div>
        <label>
          시각적 제약: 
          <input 
            type="number" 
            value={vision} 
            onChange={(e) => setVision(e.vision.value)} 
          />
        </label>
        <label>
          신체적 제약: 
          <input 
            type="number" 
            value={physical} 
            onChange={(e) => setPhysical(e.physical.value)} 
          />
        </label>
        <label>
          청각적 제약: 
          <input 
            type="number" 
            value={auditory} 
            onChange={(e) => setAuditory(e.auditory.value)} 
          />
        </label>
        <label>
          자기 관리 제약: 
          <input 
            type="number" 
            value={self_} 
            onChange={(e) => setSelf(e.self_.value)} 
          />
        </label>
        <label>
          의사소통 제약: 
          <input 
            type="number" 
            value={communication} 
            onChange={(e) => setCommunication(e.communication.value)} 
          />
        </label>
        <button onClick={handleCalculate} disabled={loading}>
          {loading ? "계산 중..." : "계산하기"}
        </button>
      </div>

      {result !== null && (
        <div>
          <h2>
            결과:{" "}
            {result}
          </h2>
        </div>
      )}

    </div>
  );
};

export default App;
