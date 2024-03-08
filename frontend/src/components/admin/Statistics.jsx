import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Statistics() {
  const [result, setResult] = useState([]);

  useEffect(
    () => async () => {
      try {
        const { data } = await axios.get("/api/v1/admin/orders/stats");
        if (data.success) {
          setResult(data.data);
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          theme: "dark",
          position: "bottom-right",
        });
      }
    },
    []
  );

  return (
    <div className="w-full h-80">

      {result.length===0 ? (
        <Loading />
        ) : (
          <>
        <p>Data</p>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={result}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalEarning"
              stroke="#FF8000"
              activeDot={{ r: 8 }}
              />
          </LineChart>
        </ResponsiveContainer>
        </>
      )}
      <ToastContainer/>
    </div>
  );
}
