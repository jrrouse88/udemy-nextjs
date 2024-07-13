import perfImg from '/public/performance.jpg';
import Hero from '@/components/Hero';

export default function PerformancePage() {
  return (
    <Hero
      imgData={perfImg}
      imgAlt="perf image"
      title="Performance Applications"
    />
  );
}
