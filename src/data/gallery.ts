import gamingBengaluru1 from '../photos/Gamming-event-bengaluru-1.jpeg'
import gamingBengaluru from '../photos/Gamming-event-bengaluru.jpeg'
import hkbkExpo1 from '../photos/Hkbk-national-level-project-expo-1.jpeg'
import hkbkExpo2 from '../photos/Hkbk-national-level-project-expo-2.jpeg'
import hkbkExpo from '../photos/Hkbk-national-level-project-expo.jpeg'
import mlhHyderabad from '../photos/mlh-hyderabad.jpeg'
import nvidiaGaming from '../photos/Nvidia-gaming-event.jpeg'
import tJohnNational from '../photos/T-jhon-National-Level.jpeg'

export type GalleryPhoto = {
  src: string
  alt: string
  description: string
  event: string
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: mlhHyderabad,
    alt: 'MLH Hackathon Hyderabad',
    description: 'Competed at the MLH Hackathon in Hyderabad — an intense weekend of building and shipping.',
    event: 'MLH Hackathon',
  },
  {
    src: hkbkExpo,
    alt: 'HKBK National Level Project Expo',
    description: 'Presented an innovative project at the HKBK National Level Project Expo.',
    event: 'HKBK Project Expo',
  },
  {
    src: hkbkExpo1,
    alt: 'HKBK Project Expo — Team',
    description: 'With the team at the HKBK National Level exhibition, showcasing our work.',
    event: 'HKBK Project Expo',
  },
  {
    src: hkbkExpo2,
    alt: 'HKBK Project Expo — Demo',
    description: 'Live demo session at the HKBK National Level Project Expo.',
    event: 'HKBK Project Expo',
  },
  {
    src: tJohnNational,
    alt: 'T-John National Level Event',
    description: 'Participated in the T-John National Level tech competition.',
    event: 'T-John National Level',
  },
  {
    src: gamingBengaluru,
    alt: 'Gaming Event Bengaluru',
    description: 'At a gaming event in Bengaluru — where tech meets competitive play.',
    event: 'Gaming Event',
  },
  {
    src: gamingBengaluru1,
    alt: 'Gaming Event Bengaluru — Arena',
    description: 'The gaming arena in Bengaluru — high energy, high stakes.',
    event: 'Gaming Event',
  },
  {
    src: nvidiaGaming,
    alt: 'NVIDIA Gaming Event',
    description: 'Attended the NVIDIA Gaming Event — experiencing next-gen graphics and hardware.',
    event: 'NVIDIA Gaming Event',
  },
]
