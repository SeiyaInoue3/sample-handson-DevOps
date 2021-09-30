// src/App.js コード例

import React , { useState, useEffect }　from "react";
import { ulid } from "ulid";
import axios from "axios";

const createURL = "https://orange-pebble-014c1dc00.azurestaticapps.net/api/sample-handson-func-create-cosmos-data";
const getURL = "https://orange-pebble-014c1dc00.azurestaticapps.net/api/sample-handson-func-get-cosmos-data";

function App() {

  // サイトロード時にcosmosDBから取得したデータ一覧の表示
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataGet = async () => {
      const response = await axios.get(getURL);
      setData(response.data.reverse());
    };
    fetchDataGet();
  }, []);

  // 投稿内容の記入
  // 入力中のテキストの状態とその状態を更新する関数
  const [inputName, setInputName] = useState("");
  // onChangeでinputNameの状態（入力状態)を更新するイベントバンドラ
  const handleChangeName = (e) => setInputName(e.target.value);

  // 入力中のテキストの状態とその状態を更新する関数
  const [inputAge, setInputAge] = useState("");
  // onChangeでinputAgeの状態（入力状態)を更新するイベントバンドラ
  const handleChangeAge = (e) => setInputAge(e.target.value);

  // データ追加ボタンをクリックした時のアクション
  const handleClick = () => {

    setInputName("");
    setInputAge("");

    // クエリ内容の定義
    const paramsId = ulid();
    const paramsName = inputName;
    const paramsAge = inputAge;

    // FunctionsにGETリクエストしてcosmosDBにデータ格納
    const fetchDataCreate = async () => {
      await axios.get(createURL, {params:{"id": paramsId, "name": paramsName, "age": paramsAge}});
    };
    fetchDataCreate();

    // 取得していたJSONファイルに追加（投稿一覧に反映）
    const newData = {"id": paramsId, "name": paramsName, "age": paramsAge};
    data.unshift(newData);
  };

  // 画面への出力
  return (
    <>
      <h1>ハンズオンデモアプリ</h1>
      <h2>名前と年齢の入力</h2>
      <p>名前：</p>
      <input value={inputName} onChange={handleChangeName} type="text" />
      <p>年齢：</p>
      <input value={inputAge} onChange={handleChangeAge} type="text" />
      <button onClick={handleClick}>データ追加</button>
      <h2>名前と年齢の出力</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}さん：{item.age}歳
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
