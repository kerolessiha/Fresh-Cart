import amazonPayLogo from "../../assets/imgs/amazon-pay.png";
import americanExpressLogo from "../../assets/imgs/American-Express-Color.png";
import masterCardLogo from "../../assets/imgs/mastercard.webp";
import PaypPalLogo from "../../assets/imgs/paypal.png";
import appStoreLogo from "../../assets/imgs/get-apple-store.png";
import googlePlayLogo from "../../assets/imgs//get-google-play.png";
export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-8">
        <div className="container space-y-4">
          <header>
            <h2 className="text-xl text-slate-800 font-semibold">
              Get The FreshCart App
            </h2>
            <p className="text-slate-400">
              We will send you a link, open it on your phone to download the app
            </p>
          </header>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address..."
              className="form-control grow"
            />
            <button className="btn font-semibold text-sm bg-primary-800 hover:bg-primary-900 text-white">
              Share App Link
            </button>
          </div>
          <div className="flex items-center justify-between py-4 border-y-2 border-slate-400 border-opacity-50">
            <div className="payment-partners flex items-center gap-3">
              <h3>Payment Partners</h3>
              <img className="w-24" src={amazonPayLogo} alt="amazonPayLogo" />
              <img
                className="w-24"
                src={americanExpressLogo}
                alt="americanExpressLogo"
              />
              <img className="w-20" src={masterCardLogo} alt="masterCardLogo" />
              <img className="w-24" src={PaypPalLogo} alt="PaypPalLogo" />
            </div>
            <div className="download flex items-center gap-3">
              <h3>Get deliveries with FreshCart</h3>
              <img className="w-24" src={appStoreLogo} alt="appStoreLogo" />
              <img
                className="w-[105px]"
                src={googlePlayLogo}
                alt="googlePlayLogo"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
