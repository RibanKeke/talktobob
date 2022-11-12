import { Component, h } from '@stencil/core';


@Component({
    tag: 'site-blog-share',
    styleUrl: 'site-blog-share.scss',
    shadow: true
})
export class SiteBlogShare {



    render() {
        return (
            <div class="site-blog-share">
                <ion-router-link
                    href=""
                    rel="noreferrer"
                    target="_blank"
                >
                    <ion-icon class="ic-links ic-facebook" name="logo-facebook"></ion-icon>
                </ion-router-link>
                <ion-router-link
                    href=""
                    rel="noreferrer"
                    target="_blank"
                >
                    <ion-icon class="ic-links" name="logo-twitter"></ion-icon>
                </ion-router-link>
                <ion-router-link
                    href=""
                    rel="noreferrer"
                    target="_blank"
                >
                    <ion-icon class="ic-links ic-linkedin" name="logo-linkedin"></ion-icon>
                </ion-router-link>
            </div>

        );
    }
}
