<template>
  <div class="home">
    <hero-nav class="hero-nav is-black is-fullheight" navbarClass="is-black">
      <div class="container hero-content has-text-centered">
        <figure>
          <img src="@/assets/flame.png" alt="speedsouls-flame-logo" />
        </figure>
        <h1 class="title is-1">Welcome!</h1>
        <h2 class="subtitle">
          Thanks for stopping by. We're currently working on getting our
          frontpage up and running. In the meantime, follow one of the links
          below to get to the content you're looking for.
        </h2>
        <div class="section buttons">
          <b-button
            class="is-medium is-warning is-inverted"
            icon-pack="fa"
            icon-left="list"
            v-scroll-to="'#games'"
            type="is-link"
            >Leaderboards</b-button
          >
          <b-button
            class="is-medium is-warning is-inverted"
            icon-pack="fa"
            icon-left="angle-double-right"
            tag="a"
            href="https://wiki.speedsouls.com/Main_Page"
            type="is-info"
            >Speedrunning Wiki</b-button
          >
        </div>
      </div>
    </hero-nav>
    <section id="games" class="games hero is-black is-fullheight">
      <div class="hero-body is-clipped">
        <div class="container">
          <div class="columns is-mobile is-multiline">
            <p class="column is-full has-text-weight-bold is-size-2">
              Leaderboards
            </p>
            <div class="column is-full">
              <GameCards />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="about hero is-black is-small">
      <div class="hero-body is-clipped">
        <div class="container hero-content has-text-centered">
          <div class="block">
            <b-icon icon="clock" size="is-large" type="is-primary"></b-icon>
          </div>
          <h1 class="title">What exactly is SpeedSouls?</h1>
          <h2 class="subtitle">
            SpeedSouls.com is an independent website run by people passionate
            about Souls speedrunning. It was founded in August 2014 to have a
            general place to go to when searching for information on Souls
            speedrunning instead of having different pastebins floating around
            the web. This website doesn't dictate the rules for Souls
            speedrunning in any shape or form whatsoever, it merely represents
            the community's opinions and decisions. Its only purpose is to
            provide help and information.
          </h2>
          <div class="buttons">
            <b-button
              class="is-medium is-outlined is-inverted"
              icon-pack="fab"
              icon-left="discord"
              tag="a"
              href="https://discord.speedsouls.com"
              type="is-primary"
              >Join our discord</b-button
            >
          </div>
        </div>
        <div class="separator"></div>
        <div class="container hero-content has-text-centered">
          <div class="block">
            <b-icon
              pack="fa"
              icon="question"
              size="is-large"
              type="is-success"
            ></b-icon>
          </div>
          <h1 class="title">What's up with this page?</h1>
          <h2 class="subtitle">
            Quite a while ago, the good folks at SpeedSouls decided to switch
            from wiki-based leaderboards to Speedrun.com leaderboards. We've
            been pretty slow on the site conversion, but we've finally put up a
            splash page to provide some extra info while we get some more work
            done. In the meantime, you can still navigate to the content you're
            looking for directly from this landing page.
          </h2>
        </div>
      </div>
    </section>
    <ss-footer />
  </div>
</template>

<script>
import HeroNav from "@/components/HeroNav.vue";
import GameCards from "@/components/GameCards.vue";

export default {
  name: "home",
  components: {
    HeroNav,
    GameCards
  }
};
</script>

<style scoped lang="scss">
.home {
  .hero-nav {
    border-bottom: 1px solid $dark;
  }

  .about {
    padding: 4rem 0;

    .separator {
      max-width: 500px;
      border-bottom: 1px dotted $grey-light;
      margin: 0 auto 4rem;
    }
  }

  .hero-content {
    display: flex;
    flex-direction: column;

    .subtitle {
      max-width: 650px;
      margin: auto;
    }

    .buttons {
      margin: 0 auto;

      @include touch {
        .button {
          width: 100%;
        }
      }
    }
  }
}
</style>
