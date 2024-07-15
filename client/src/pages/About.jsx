import React from 'react';
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";

export default function About() {
  return (
    <Timeline className='m-10'>
      <Timeline.Item>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>August 2024</Timeline.Time>
          <Timeline.Title>Who Are We?</Timeline.Title>
          <Timeline.Body>
              We are "Review World," your go-to platform for reading and posting reviews about everything that exists. <br />
              Our mission is to create a comprehensive, user-friendly space where you can find detailed, trustworthy reviews <br />
              to make informed decisions about products, services, and experiences.
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>August 2024</Timeline.Time>
          <Timeline.Title>What Makes Us Different from Others?</Timeline.Title>
          <Timeline.Body>
              At "Review World," we go beyond traditional review platforms by offering a range of innovative features designed <br />
              to enhance your experience and ensure you make well-informed decisions. Our standout feature is the <b>Unique Chat Functionality</b>, <br />
              which sets us apart from other review sites. With this feature, users can directly interact with reviewers, <br />
              asking specific questions and getting detailed answers in real-time. <br />
              This personalized interaction helps you gain deeper insights and clarifies any doubts you might have, <br />
              making your decision-making process more robust and reliable.
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>August 2024</Timeline.Time>
          <Timeline.Title>Why Choose Us?</Timeline.Title>
          <Timeline.Body>
              Choosing "Review World" means choosing efficiency and clarity. <br />
              Our <b>AI summarizer</b> intelligently condenses all reviews and ratings into a concise summary, <br />
              saving you time and reducing confusion. Additionally, we provide comprehensive graphical analyses, giving you <br />
              a clear, visual understanding of the feedback and trends.
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
