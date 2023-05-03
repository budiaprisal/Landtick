import React from "react";

export default function Jumbotron() {
  return (
    <>
      <div className="" style={{ background: "linear-gradient(90deg, #EC7AB7 -0.6%, #EC7A7A 100%)", width: "100%", height: "300px" }}>
        <div className="d-flex">
            <div className="text-light mt-5 ms-5">
                <h1 className="ms-5 fw-bold text-white">Selamat Pagi, Ticket Seekers !</h1>
                <h5 className="ms-5 mt-5 text-white">Ingin Pulkam dengan Good Deal ?</h5>
                <h5 className="ms-5 mt-2 text-white">Masuk atau Daftar Sekarang ! !</h5>
            </div>
            <div className="mt-4 ms-5">
                <img src="/images/Iklan.png" alt="Logo" />
            </div>
        </div>
      </div>
    </>
  );
}
