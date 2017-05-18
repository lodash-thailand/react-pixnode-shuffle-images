// @flow
/**
 * Owner: Rungsikorn Rungsikavanich
 * This component will shuffle image
 * and lazy load image
 */

import React from 'react'
import styled from 'styled-components'
import { TransitionMotion, spring } from 'react-motion'

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow:hidden;
  position: relative;
`
const ImageContainer = styled.div`
  opacity: ${props => props.opacity || 1};
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  position: absolute;
  top:0;
  left:0;
  backgroundImage: url(${props => props.imageURL});
`
export default class ShuffleImage extends React.Component {
  props: {
    images: string[],
    timeout: number,
    style: any,
  }
  constructor (props) {
    super(props)
    this.state = {``
      index: 0,
      images: [props.images[0]]
    }
    this._nextImage = this._nextImage.bind(this)
    this._beginAnimate = this._beginAnimate.bind(this)
  }

  componentDidMount () {
    this._nextImage()
  }
  componentWillUnmount () {
    clearTimeout(this.timeout)
  }
  _nextImage () {
    if (this.props.images.length < 1) {
      return
    }
    let nextIndex = this.state.index + 1
    if (this.state.index >= this.props.images.length - 1) {
      nextIndex = 0
    }
    if (!this.state.images[nextIndex]) {
      // lazy image reload
      const c = new Image() // eslint-disable-line
      c.onload = () => {
        this._beginAnimate(nextIndex)
      }
      c.src = this.props.images[nextIndex]
    } else {
      this._beginAnimate(nextIndex)
    }
  }
  _beginAnimate (nextIndex) {
    this.setState(prevState => ({
      images: [...prevState.images, this.props.images[nextIndex]],
      index: nextIndex,
      prevIndex: prevState.index
    }))
    this.timeout = setTimeout(this._nextImage, (Math.random() * 12000) + 4000)
  }
  _willLeave () {
    return { opacity: spring(0, {stiffness: 60, damping: 26}) }
  }
  _willEnter () {
    return { opacity: spring(1, {stiffness: 60, damping: 26}) }
  }
  render () {
    return (
      <Container style={this.props.style}>
        <TransitionMotion
          willLeave={this._willLeave}
          _willEnter={this._willEnter}
          styles={this.props.images.map(
            (image, i) => ({
              key: image,
              data: this.state.images[i],
              style: { opacity: this.state.index === i ? spring(1, {stiffness: 60, damping: 26}) : spring(0, {stiffness: 60, damping: 26}) }
            })
          )}
        >
          {(styles) =>
            <div>
              {styles.map(config => <ImageContainer style={config.style} key={config.key} imageURL={config.data} />)}
            </div>
          }
        </TransitionMotion>
      </Container>
    )
  }
}
