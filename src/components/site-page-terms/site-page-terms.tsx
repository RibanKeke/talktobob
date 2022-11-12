import { Component, h } from "@stencil/core";
import { state } from "../../store";
import siteShellData from "../../content/site/data/site_shell.json";
@Component({
  tag: "site-page-terms",
  styleUrl: "site-page-terms.scss",
  shadow: true,
})
export class SitePageTerms {
  render() {
    const { menu } = state.NAVIGATION;

    return (
      <ion-content fullscreen >
        <site-header menuItems={menu.items} footerLinks={siteShellData.footerLinks} headerBackground="blogColor"></site-header>
        <div class="main-container mf-site-container">
          <div class="terms-container">
            <div class="terms">
              <h2><strong>Terms and Conditions</strong></h2>
              <p>Welcome to Zendare!</p>
              <p>These terms and conditions outline the rules and regulations for the use of Zendare.</p>
              <p>By using this app we assume you accept these terms and conditions. Do not continue to use Zendare if you do not agree to take all of the terms and conditions stated on this page.</p>
              <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
              <h3><strong>License</strong></h3>
              <p>Unless otherwise stated, Zendare and/or its licensors own the intellectual property rights for all material on Zendare. All intellectual property rights are reserved. You may access this from Zendare for your own personal use subjected to restrictions set in these terms and conditions.</p>
              <p>You must not:</p>
              <ul>
                <li>Republish material from Zendare</li>
                <li>Sell, rent or sub-license material from Zendare</li>
                <li>Reproduce, duplicate or copy material from Zendare</li>
                <li>Redistribute content from Zendare</li>
              </ul>
              <p>This Agreement shall begin on the date hereof.</p>
              <p>Parts of this app offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Zendare does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Zendare, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Zendare shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
              <p>Zendare reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>
              <p>You warrant and represent that:</p>
              <ul>
                <li>You are entitled to post the Comments on our App and have all necessary licenses and consents to do so;</li>
                <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
              </ul>
              <p>You hereby grant Zendare a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>
              <h3><strong>Hyperlinking to our App</strong></h3>
              <p>The following organizations may link to our App without prior written approval:</p>
              <ul>
                <li>Government agencies;</li>
                <li>Search engines;</li>
                <li>News organizations;</li>
                <li>Online directory distributors may link to our App in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
              </ul>
              <p>These organizations may link to our home page, to publications or to other App information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.</p>
              <p>We may consider and approve other link requests from the following types of organizations:</p>
              <ul>
                <li>commonly-known consumer and/or business information sources;</li>
                <li>dot.com community sites;</li>
                <li>associations or other groups representing charities;</li>
                <li>online directory distributors;</li>
                <li>internet portals;</li>
                <li>accounting, law and consulting firms; and</li>
                <li>educational institutions and trade associations.</li>
              </ul>
              <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Zendare; and (d) the link is in the context of general resource information.</p>
              <p>These organizations may link to our App so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.</p>
              <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our App, you must inform us by sending an e-mail to Zendare. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our App, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>
              <p>Approved organizations may hyperlink to our App as follows:</p>
              <ul>
                <li>By use of our corporate name; or</li>
                <li>By use of the uniform resource locator being linked to; or</li>
                <li>By use of any other description of our App being linked to that makes sense within the context and format of content on the linking party's site.</li>
              </ul>
              <p>No use of Zendare's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>
              <h3><strong>iFrames</strong></h3>
              <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our App.</p>
              <h3><strong>Content Liability</strong></h3>
              <p>We shall not be hold responsible for any content that appears on your App. You agree to protect and defend us against all claims that is rising on our App. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
              <h3><strong>Your Privacy</strong></h3>
              <p>Please read Privacy Policy.</p>
              <h3><strong>Reservation of Rights</strong></h3>
              <p>We reserve the right to request that you remove all links or any particular link to our App. You approve to immediately remove all links to our App upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our App, you agree to be bound to and follow these linking terms and conditions.</p>
              <h3><strong>Removal of links from our App</strong></h3>
              <p>If you find any link on our App that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>
              <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>
              <h3><strong>Disclaimer</strong></h3>
              <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our App and the use of this website. Nothing in this disclaimer will:</p>
              <ul>
                <li>limit or exclude our or your liability for death or personal injury;</li>
                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
              </ul>
              <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>
              <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>

              <p><ion-text>By downloading or using the app, these terms will automatically apply to you - you should make sure therefore that you read them carefully before using the app. You're not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You're not allowed to attempt to extract the source code of the app, and you also shouldn't try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to Zenify SRL.</ion-text></p>
              <p><ion-text>Zenify srl is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you're paying for.</ion-text></p>
              <p><ion-text>The Zendare app stores and processes personal data that you have provided to us, in order to provide our Service. It's your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone's security features and it could mean that the Zendare app won't work properly or at all.</ion-text></p>
              <p><ion-text>The app does use third party services that declare their own Terms and Conditions.</ion-text></p>
              <p><ion-text>Link to Terms and Conditions of third party service providers used by the app</ion-text></p>
              <ul>
                <li>
                  <a target="_blank" href="https://policies.google.com/privacy">Google Play Services</a>
                </li>
                <li>
                  <a target="_blank" href="https://firebase.google.com/policies/analytics">Google Analytics for Firebase</a>
                </li>
              </ul>
              <p><ion-text>You should be aware that there are certain things that Zenify SRL will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but Zenify SRL cannot take responsibility for the app not working at full functionality if you don't have access to Wi-Fi, and you don't have any of your data allowance left.</ion-text></p>
              <p><ion-text>If you're using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you're accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you're using the app, please be aware that we assume that you have received permission from the bill payer for using the app.</ion-text></p>
              <p><ion-text>Along the same lines, Zenify SRL cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged - if it runs out of battery and you can't turn it on to avail the Service, Zenify SRL cannot accept responsibility.</ion-text></p>
              <p><ion-text>With respect to Zenify SRL's responsibility for your use of the app, when you're using the app, it's important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. Zenify SRL accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.</ion-text></p>
              <p><ion-text>At some point, we may wish to update the app. The app is currently available on Android &amp; iOS - the requirements for both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you'll need to download the updates if you want to keep using the app. Zenify SRL does not promise that it will always update the app so that it is relevant to you and/or works with the Android &amp; iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.</ion-text></p>
              <h3><ion-text>Changes to This Terms and Conditions</ion-text></h3>
              <p><ion-text>We may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Terms and Conditions on this page. These terms and conditions are effective as of 2021-01-03</ion-text></p>
              <h3><ion-text>Contact Us</ion-text></h3>
              <p><ion-text>If you have any questions or suggestions about our Terms and Conditions, do not hesitate to contact us at <a href="mailto:contact@zendare.app">contact@zendare.app</a></ion-text></p>
            </div>
          </div>
        </div>
        <site-footer></site-footer>
      </ion-content>
    );
  }
}
