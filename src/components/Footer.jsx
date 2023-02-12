const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer">
          <section id="left">
            <p>Contact Us</p>
            <div className="address">
              <div>
                <i className="fa fa-mail-forward"></i><a
                  href="mailto:info@future.lt">info@future.lt</a>
                <br />
              </div>
              <div>
                <i className="fa fa-phone"></i><p>+37061111111</p>
                <br />
              </div>
              <div>
                <i className="fa fa-location-arrow"></i><p>Kaunas, Lietuva</p>
                <br />
              </div>
            </div>
          </section>
          <div className="logo"></div>
          <section id="right">
            <div className="soc-networks">
              <h3>Follow Us</h3>
              <i className="fa fa-facebook"></i>
              <i className="fa fa-instagram">
              </i>
            </div>
          </section>
        </div>

        <div className="copyrights">
          <p>Copyrights © 2023 FUTURE. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;