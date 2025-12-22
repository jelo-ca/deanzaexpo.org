import "./Sponsors.css";

export default function Sponsors() {
  return (
    <section id="sponsors-section">
      <h2>Sponsors</h2>
      <div className="gold-sponsor-container">
        <h3>Gold Sponsors</h3>
        <div className="logo-container fadeUp">
          <img
            src="https://fhda.academicworks.com/image_uploads/W1siZiIsImltYWdlX3VwbG9hZHMvMS8wYjlkMmIwNS1iNzEzLTQzYTktODM3YS1lZWNjNjc0Mzc5MDIvSUNDIGxvZ28uanBnIl1d?sha=f41292a7963cff54"
            alt=""
            className="sponsor-logo"
          />
          <img
            src="https://www.deanza.edu/dasg/images/old-dasb-logos/old-dasb-logo-hands-full.png"
            alt=""
            className="sponsor-logo"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDIvAaib-qidLGgu9KasyhP_bvQbrIPfFvrQ&s"
            alt=""
            className="sponsor-logo"
          />
        </div>
        <h3>Silver Sponsors</h3>
        <div className="logo-container fadeUp">
          <img src="" alt="" className="sponsor-logo" />
          <img src="" alt="" className="sponsor-logo" />
          <img src="" alt="" className="sponsor-logo" />
        </div>
        <h3>Bronze Sponsors</h3>
        <div className="logo-container fadeUp">
          <img src="" alt="" className="sponsor-logo" />
          <img src="" alt="" className="sponsor-logo" />
          <img src="" alt="" className="sponsor-logo" />
        </div>
      </div>
      <div className="sponsor-cta">
        <p className="sponsor-cta-text">Interested in becoming a sponsor?</p>
      </div>
    </section>
  );
}
