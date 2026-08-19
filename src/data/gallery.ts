import bengaluru1 from '../photos/Gamming-event-bengaluru-1.jpeg'
import bengaluru from '../photos/Gamming-event-bengaluru.jpeg'
import hkbk1 from '../photos/Hkbk-national-level-project-expo-1.jpeg'
import hkbk2 from '../photos/Hkbk-national-level-project-expo-2.jpeg'
import hkbk from '../photos/Hkbk-national-level-project-expo.jpeg'
import nvidia from '../photos/Nvidia-gaming-event.jpeg'
import tjohn from '../photos/T-jhon-National-Level.jpeg'
import mlh from '../photos/mlh-hyderabad.jpeg'

export type GalleryPhoto = {
  src: string
  alt: string
  caption: string
}

export const galleryPhotos: GalleryPhoto[] = [
  { src: mlh, alt: 'MLH hackathon in Hyderabad', caption: 'MLH Hyderabad' },
  { src: tjohn, alt: 'T. John National Level event', caption: 'T. John National Level' },
  { src: hkbk, alt: 'HKBK National Level Project Expo', caption: 'HKBK Project Expo' },
  { src: hkbk1, alt: 'HKBK National Level Project Expo', caption: 'HKBK Project Expo' },
  { src: hkbk2, alt: 'HKBK National Level Project Expo', caption: 'HKBK Project Expo' },
  { src: nvidia, alt: 'NVIDIA gaming event', caption: 'NVIDIA Gaming Event' },
  { src: bengaluru, alt: 'Gaming event in Bengaluru', caption: 'Gaming Event, Bengaluru' },
  { src: bengaluru1, alt: 'Gaming event in Bengaluru', caption: 'Gaming Event, Bengaluru' },
]
