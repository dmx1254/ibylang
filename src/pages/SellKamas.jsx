import React, { useState, useEffect } from "react";
import { DofusKamas, DofusRetro, DofusTouch } from "../components";

import { Helmet } from "react-helmet";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { addServers } from "../features/serverSlices";

import { getUsdtRa } from "../features/rateUsdtSlices";

import { getEuroRate } from "../features/rateEuroSlice";

import { getDollarRate } from "../features/rateDollarSlices";

import { carousel } from "../constants/data";

import LoaderServer from "../components/LoaderServer";

const SellKamas = () => {
  const dispatch = useDispatch();

  const { language } = useSelector((state) => state.language);

  const [servers, setServers] = useState([]);
  const [loadingSell, setLoadingSell] = useState(false);

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

  useEffect(() => {
    const getServers = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/server`)
        .then((res) => {
          setServers(res.data);
          setLoadingSell(true);
        });
    };
    getServers();
  }, [dispatch]);
  return !loadingSell ? (
    <LoaderServer />
  ) : (
    <div className="sellkamas">
      <Helmet>
        <title>Vendez vos kamas aux meilleurs taux du marché</title>
      </Helmet>
      <DofusKamas servers={servers} id="kamas" />
      <DofusRetro servers={servers} id="retro" />
      <DofusTouch servers={servers} id="touch" />
      {language === "anglais" ? (
        <div className="kamas-sell-security">
          {carousel?.map((carous, i) => (
            <div className="carousel-container" key={i}>
              <span className="carousel-icon">{carous.icon}</span>
              <h3 className="carousel-title">{carous.titleEn}</h3>
              <p className="carousel-desc">{carous.contentEn}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="kamas-sell-security">
          {carousel?.map((carous, i) => (
            <div className="carousel-container" key={i}>
              <span className="carousel-icon">{carous.icon}</span>
              <h3 className="carousel-title">{carous.title}</h3>
              <p className="carousel-desc">{carous.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellKamas;
