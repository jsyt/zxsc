import React, { useRef, useEffect } from 'react'
import HomeHeader from './components/HomeHeader'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '@/store/reducers';
import { HomeState } from '@/store/reducers/home';
import mapDispatchToProps from '@/store/actions/home';
import "./index.less";
import HomeSliders from './components/HomeSliders'
import LessonList from './components/LessonList';
import { loadMore } from '@/utils';


type Props = RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

function Home(props: Props) {
  let homeContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    loadMore(homeContainer.current, props.getLessons)
  }, [])
  return (
    <>
      <HomeHeader
        currentCategory={ props.currentCategory }
        setCurrentCategory={props.setCurrentCategory}
      />

      <div className="home-container" ref={ homeContainer } >
        <HomeSliders
          sliders={ props.sliders }
          getSliders={props.getSliders}
        />
        <LessonList
          getLessons={ props.getLessons }
          lessons={ props.lessons }
        />
      </div>
    </>
  )
}

const mapStateToProps = (state: RootState): HomeState => state.home
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);