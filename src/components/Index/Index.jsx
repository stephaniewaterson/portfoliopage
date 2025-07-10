import React, { Component } from "react";

class Index extends Component {
  state = {
    opacity: "1",
  };

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        let currentScrollPos = window.scrollY;
        let maxScroll = document.body.scrollHeight - window.innerHeight;
        console.log(maxScroll);
        if (currentScrollPos > 0 && currentScrollPos < maxScroll) {
          this.setState({ opacity: "0" });
          console.log(currentScrollPos);
        } else {
          this.setState({ opacity: "1" });
        }
      };
    }
  }
}

export default Index;
