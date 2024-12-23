import React, { useState } from "react";

const App = () => {
  const [green, setGreen] = useState(0);
  const [temp, setTemp] = useState(0);
  const [prep, setPrep] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = "https://2244-34-125-18-251.ngrok-free.app/calc";

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}?green=${green}&temp=${temp}&prep=${prep}`, {
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
      if (data.result <= 0.33) {
        setResult("low");
      } else {
        if (data.result <= 0.40) {
          setResult("soso");
        } else {
          setResult("high");
        }
      }
    } catch (error) {
      console.error("Error calling the API:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h1>온열환자 발생 위험도 예측</h1>
      <div>
        <label>
          지역 선택: 
          <select 
            value={green} 
            onChange={(e) => setGreen(e.target.value)} 
          >
            <option value="38.60">서울</option>
            <option value="57.76">부산</option>
            <option value="77.40">대구</option>
            <option value="56.83">인천</option>
            <option value="74.31">광주</option>
            <option value="80.49">대전</option>
            <option value="76.03">울산</option>
            <option value="68.69">세종</option>
            <option value="75.82">경기</option>
            <option value="78.95">강원</option>
            <option value="74.99">충북</option>
            <option value="63.08">충남</option>
            <option value="67.77">전북</option>
            <option value="70.97">전남</option>
            <option value="73.11">경북</option>
            <option value="73.00">경남</option>
            <option value="82.59">제주</option>
          </select>
        </label>
        <label>
          온도 (°C): 
          <input 
            type="number" 
            value={temp} 
            onChange={(e) => setTemp(e.target.value)} 
          />
        </label>
        <label>
          강수량 (mm): 
          <input 
            type="number" 
            value={prep} 
            onChange={(e) => setPrep(e.target.value)} 
          />
        </label>
        <button onClick={handleCalculate} disabled={loading}>
          {loading ? "계산 중..." : "계산하기"}
        </button>
      </div>

      {result !== null && (
        <div>
          <h2
          style={{
            color: result === "low" ? "green" :
                   result === "soso" ? "green" :
                   result == "high" ? "orange" :
                   result == "very high" ? "red" :
                   "black"
          }}
          >
            결과:{" "}
            {result === "low" ? "안전" :
              result === "soso" ? "보통" :
              result === "high" ? "위험" :
              result}
          </h2>
        </div>
      )}

    </div>
  );
};

export default App;
