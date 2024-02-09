"use client"
import Image from "next/image";
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import BaseTable from "./components/BaseTable";
import data from './utils/static/list_endpoints.json'

const Home: React.FC = () => {
  const { login, handleAuthCallback } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      handleAuthCallback(code);
    } else (
      login(window.location.href)
    )
  }, []);


  return (
    <div>
      <h1 className="text-[32px] font-bold mb-10">Endpoints</h1>

      <BaseTable data={data} />

    </div>
  );
};

export default Home;
