import './framer/styles.css'

import CuteSmallButtonFramerComponent from './framer/button/cute-small-button'
import NavBarFramerComponent from './framer/navigation/nav-bar'
import FooterFramerComponent from './framer/footer/footer'
import IntroFramerComponent from './framer/intro'
import PrimaryButtonFramerComponent from './framer/button/primary-button'
import ProjectsCardFramerComponent from './framer/card/projects-card'
import BlogCardFramerComponent from './framer/card/blog-card'

export default function App() {
  return (
    <div className='flex flex-col items-center gap-3 bg-[rgb(255,_255,_255)]'>
      <CuteSmallButtonFramerComponent.Responsive
        D5f60bW5q={"https://www.framer.com/marketplace/templates/uxfolio/"}
        QXsX1ABH_={"Get this for Free"}
      />
      <NavBarFramerComponent.Responsive/>
      <FooterFramerComponent.Responsive/>
      <IntroFramerComponent.Responsive/>
      <PrimaryButtonFramerComponent.Responsive
        Cprqi0hWm={"Read More"}
        dbCMAqs0u={"/blog"}
      />
      <ProjectsCardFramerComponent.Responsive
        B669juXtz={"View Full Case Study"}
        EKOEBmddh={"25% More Bookings Through Simplified Navigation"}
        QQyPlXms1={"UX Design"}
        ReFF1lQ_S={"Bookings"}
        UNqrno02U={false}
        XaUwce3fx={"Travel"}
        gbuvSsAXX={"<p>Content</p>"}
        wt28EYFYm={"Travel"}
      />
      <BlogCardFramerComponent.Responsive
        cm3JAkpVP={"/blog/:slug"}
        dauw6HJQy={"12 Jan 2024"}
        fGbL4VXk0={false}
        ik63V3APS={"<p>Content</p>"}
        k91hGGehh={"The Power of User Testing: Real Insights for Real Results"}
      />
    </div>
  );
};