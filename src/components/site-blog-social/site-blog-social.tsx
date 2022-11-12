import { Component, h,Prop } from '@stencil/core';


@Component({
    tag: 'site-blog-social',
    styleUrl: 'site-blog-social.scss',
    shadow: true
})
export class SiteBlogSocial {

    @Prop() footerLinks: {
        linkedin_url: string;
        youtube_url: string;
        facebook_url: string;
        instagram_url: string;
        twitter_url: string;
      };
    @Prop() followLabel:string;

    render() {
        return (
            <div class="main-container ion-hide-md-down">
                <h1 class="social-title"><ion-text>{this.followLabel}</ion-text></h1>
                <div class="links-container">
                    <ion-router-link
                        href={this.footerLinks.linkedin_url}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <ion-icon class="link" name="logo-linkedin"></ion-icon>
                    </ion-router-link>
                    <ion-router-link
                        href={this.footerLinks.twitter_url}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <ion-icon class="link" name="logo-twitter"></ion-icon>
                    </ion-router-link>
                    <ion-router-link
                        href={this.footerLinks.youtube_url}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <ion-icon class="link" name="logo-youtube"></ion-icon>
                    </ion-router-link>
                    <ion-router-link
                        href={this.footerLinks.instagram_url}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <ion-icon class="link" name="logo-instagram"></ion-icon>
                    </ion-router-link>
                    <ion-router-link
                        href={this.footerLinks.facebook_url}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <ion-icon class="link ic-facebook" name="logo-facebook"></ion-icon>
                    </ion-router-link>
                </div>
            </div>
        );
    }
}
