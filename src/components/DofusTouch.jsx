import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import { getUsdtRa } from "../features/rateUsdtSlices";

import { getEuroRate } from "../features/rateEuroSlice";

import { getDollarRate } from "../features/rateDollarSlices";

const DofusTouch = ({ servers }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // const { servers } = useSelector((state) => state.servers);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      servers.filter((server) => server.serverCategory === "dofus-touch")
    );
  }, [servers]);

  const { language } = useSelector((state) => state.language);

  const { eurorate } = useSelector((state) => state.eurorate);
  const { dollarate } = useSelector((state) => state.dollarate);
  const { usdtra } = useSelector((state) => state.usdtra);
  const { cnyrate } = useSelector((state) => state.cnyrate);

  useEffect(() => {
    const getUsdt = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/usdt`)
        .then((res) => dispatch(getUsdtRa(res?.data[0]?.usdt)));
    };
    getUsdt();
  }, [dispatch]);

  useEffect(() => {
    const getEuro = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/euro`)
        .then((res) => dispatch(getEuroRate(res?.data[0]?.euro)));
    };
    getEuro();
  }, [dispatch]);

  useEffect(() => {
    const getDollar = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/dollar`)
        .then((res) => dispatch(getDollarRate(res?.data[0]?.dollar)));
    };
    getDollar();
  }, [dispatch]);

  return (
    <div className="dofus-touch">
      <h1 className="dofus-touch-title">Dofus Touch</h1>
      <table id="touch">
        <thead>
          {language === "anglais" ? (
            <tr>
              <th>
                <div className="divider">
                  <span>Server</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Price</span>
                </div>
              </th>
              {/* <th>
                <div className="divider">
                  <span>USDT</span>
                </div>
              </th> */}
              <th>
                <div className="divider">
                  <span>Paypal</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Skrill</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Sepa</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Payeer</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Status</span>
                </div>
              </th>
            </tr>
          ) : (
            <tr>
              <th>
                <div className="divider">
                  <span>Serveur</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Prix</span>
                </div>
              </th>
              {/* <th>
                <div className="divider">
                  <span>USDT</span>
                </div>
              </th> */}
              <th>
                <div className="divider">
                  <span>Paypal</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Skrill</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Sepa</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Payeer</span>
                </div>
              </th>
              <th>
                <div className="divider">
                  <span>Status</span>
                </div>
              </th>
            </tr>
          )}
        </thead>

        {language === "anglais" ? (
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td>{item.serverName}</td>
                <td>
                  {item.serverPriceDh}
                  <span className="currency-color">Dhs/M</span>
                </td>
                {/* <td>
                  {(item.serverPriceDh / usdtra).toFixed(2)}
                  <span className="currency-color">Usdt/M</span>
                </td> */}
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <a href="javascript:void(Tawk_API.toggle())">
                  <td
                    className={
                      item.serverStatus === "Disponible"
                        ? "success"
                        : item.serverStatus === "Stock complet"
                        ? "no-success"
                        : "quickly"
                    }
                  >
                    {item.serverStatus === "Disponible" && "Clic to sell"}
                    {item.serverStatus === "Vendre rapidement" &&
                      "Sell quickly"}
                    {item.serverStatus === "Stock complet" && "Full Stock"}
                  </td>
                </a>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td>{item.serverName}</td>
                <td>
                  {item.serverPriceDh}
                  <span className="currency-color">Dhs/M</span>
                </td>
                {/* <td>
                  {(item.serverPriceDh / usdtra).toFixed(2)}
                  <span className="currency-color">Usdt/M</span>
                </td> */}
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <td>
                  {(item.serverPriceDh / eurorate).toFixed(2)}
                  <span className="currency-color">€/M</span>
                </td>
                <a href="javascript:void(Tawk_API.toggle())">
                  <td
                    className={
                      item.serverStatus === "Disponible"
                        ? "success"
                        : item.serverStatus === "Stock complet"
                        ? "no-success"
                        : "quickly"
                    }
                  >
                    {item.serverStatus === "Disponible"
                      ? "Cliquer pour vendre"
                      : item.serverStatus}
                  </td>
                </a>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default DofusTouch;
