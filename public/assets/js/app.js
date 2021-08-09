const vue = new Vue({
  el: "#app",
  data: {
    url: "",
    slug: "",
    error: "",
    errorVisible: false,
    createdVisible: false,
    loaderVisible: false,
    created: null,
  },
  methods: {
    async createUrl() {
      this.error = "";
      this.errorVisible = false;
      this.loaderVisible = true;
      const response = await fetch("/url", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          url: this.url,
          slug: this.slug || undefined,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.errorVisible = false;
        this.createdVisible = true;
        this.loaderVisible = false;
        this.created = `http://localhost:4000/${result.slug}`;
      } else if (response.status === 429) {
        this.error =
          "You are sending too many requests. Try again in 30 seconds.";
        this.errorVisible = true;
        this.loaderVisible = false;
        this.createdVisible = false;
      } else {
        const result = await response.json();
        this.errorVisible = true;
        this.loaderVisible = false;
        this.createdVisible = false;
        this.error = result.message;
      }
    },
  },
});
