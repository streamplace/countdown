import React, { Component } from "react";
import styled from "styled-components";
import pad from "left-pad";
import { shadow } from "./Text";
import chrono from "chrono-node";

const Number = styled.span`
  text-shadow: ${(shadow(70), "black")};
  position: relative;
  font-family: "Fira Code", monospace;
  font-weight: 300;
  border-bottom: 1px solid white;
  line-height: 70px;
  font-size: 70px;
  color: white;
`;

const Label = styled.span`
  text-shadow: ${(shadow(40), "black")};
  position: relative;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-weight: 300;
  font-size: 40px;
  color: white;
`;

const CountBoxStyled = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
`;

const ContainerTime = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 1em;
`;

const WrapContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1em auto;

  @media (max-width: 570px) {
    display: block;
  }
`;

const CountBox = props => (
  <CountBoxStyled>
    <Number>{pad(props.number, props.width, 0)}</Number>
    <Label>{props.label}</Label>
  </CountBoxStyled>
);

export default class Countdown extends Component {
  constructor(props) {
    super(props);
    this.go = this.go.bind(this);
    this.state = {
      toText: "five minutes from now",
      to: chrono.parse("five minutes from now")
    }
  }
  
  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentDidMount() {
    setTimeout(() => this.go());
  }
  
  static defaultProps = {
    to: "five minutes from now"
  }
  
  componentWillReceiveProps(props) {
    if (props.from) {
      if (this.state.fromText === props.from) {
        return;
      }
      this.setState({
        fromText: props.from,
        from: chrono.parseDate(props.from),
        to: null,
        toText: null
      });
      return;
    }
    if (this.state.toText === props.to) {
      return;
    }
    this.setState({
      to: chrono.parseDate(props.to),
      toText: props.to,
      from: null,
      fromText: null
    });
  }

  getDiff() {
    if (this.state.from) {
      return Date.now() - this.state.from.getTime();
    }
    return this.state.to.getTime() - Date.now();
  }

  go() {
    
    if (this.done) {
      return;
    }
    if (!this.state.to && !this.state.from) {
      requestAnimationFrame(this.go);
      return;
    }
    let diff = this.getDiff();

    if (diff < 0) {
      return this.setState({
        ms: 0,
        sec: 0,
        min: 0,
        hour: 0,
        days: 0,
        years: 0
      });
    }

    const ms = diff % 1000;
    diff = Math.floor(diff / 1000);

    const sec = diff % 60;
    diff = Math.floor(diff / 60);

    const min = diff % 60;
    diff = Math.floor(diff / 60);

    const hour = diff % 24;
    diff = Math.floor(diff / 24);

    const days = diff % 365;
    diff = Math.floor(diff / 365);
    this.setState({
      ms,
      sec,
      min,
      hour,
      days,
      years: diff
    });
    requestAnimationFrame(this.go);
  }

  componentWillUnmount() {
    this.done = true;
  }

  render() {
    return (
      <ContainerTime {...this.props}>
        <WrapContainer>
          <CountBox label="YEARS" number={this.state.years} width={4} />
          <CountBox label="DAYS" number={this.state.days} width={3} />
          <CountBox label="HRS" number={this.state.hour} width={2} />
        </WrapContainer>
        <WrapContainer>
          <CountBox label="MIN" number={this.state.min} width={2} />
          <CountBox label="SEC" number={this.state.sec} width={2} />
          <CountBox label="MS" number={this.state.ms} width={3} />
        </WrapContainer>
      </ContainerTime>
    );
  }
}
