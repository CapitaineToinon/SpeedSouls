export default {
  data: () => ({
    off: {
      x: 0,
      y: 0
    }
  }),
  methods: {
    updateOffets() {
      const { x, y } = this.getScrollOffsets();
      this.off = { x, y };
    },
    getScrollOffsets() {
      let doc = document,
        w = window;
      let x, y, docEl;

      if (typeof w.pageYOffset === "number") {
        x = w.pageXOffset;
        y = w.pageYOffset;
      } else {
        docEl =
          doc.compatMode && doc.compatMode === "CSS1Compat"
            ? doc.documentElement
            : doc.body;
        x = docEl.scrollLeft;
        y = docEl.scrollTop;
      }
      return { x: x, y: y };
    }
  },
  mounted() {
    document.addEventListener("scroll", this.updateOffets.bind(this));
  },
  unmounted() {
    document.removeEventListener("scroll", this.updateOffets.bind(this));
  }
};
