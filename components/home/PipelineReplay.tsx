'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Icon from './Icon';
import { motionDisabled } from '../../lib/home-browser';

export default function PipelineReplay({ children }: { children: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const [state, setState] = useState('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const frame = useRef(0);
  function cancel() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    cancelAnimationFrame(frame.current);
  }
  function complete() {
    cancel();
    setState('finished');
    section.current
      ?.querySelectorAll('.pipeline-node')
      .forEach((node) => node.classList.add('is-reached'));
  }
  function run() {
    cancel();
    if (motionDisabled()) {
      complete();
      return;
    }
    setState('idle');
    section.current
      ?.querySelectorAll('.pipeline-node')
      .forEach((node) => node.classList.remove('is-reached'));
    section.current?.querySelector('.pipeline-map')?.getBoundingClientRect();
    frame.current = requestAnimationFrame(() => {
      setState('playing');
      const nodes = section.current?.querySelectorAll('.pipeline-node');
      nodes?.[0].classList.add('is-reached');
      nodes?.forEach((node, i) => {
        if (i)
          timers.current.push(
            setTimeout(() => node.classList.add('is-reached'), i * 1500),
          );
      });
      timers.current.push(setTimeout(complete, 6000));
    });
  }
  useEffect(() => {
    const root = section.current!;
    const map = root.querySelector<SVGSVGElement>('.pipeline-map')!;
    const narrow = matchMedia('(max-width: 767px)');
    function layout() {
      const vertical = narrow.matches,
        width = map.clientWidth,
        height = map.clientHeight,
        step = width / 5;
      map.setAttribute(
        'viewBox',
        vertical ? '0 0 320 1120' : `0 0 ${width} ${height}`,
      );
      root.querySelectorAll('.pipeline-node-wrap').forEach((node, i) => {
        node.setAttribute('x', vertical ? '52' : String(i * step));
        node.setAttribute('y', vertical ? String(16 + i * 220) : '56');
        node.setAttribute('width', vertical ? '252' : String(step));
        node.setAttribute('height', vertical ? '210' : String(height - 56));
      });
      map.style.setProperty('--pipeline-start-x', `${step / 2}px`);
      map.style.setProperty('--pipeline-end-x', `${step * 4.5}px`);
      root
        .querySelector('.pipeline-path')!
        .setAttribute(
          'd',
          vertical
            ? 'M82 46H24V926H82 M24 266H82 M24 486H82 M24 706H82'
            : `M${step / 2} 86H${step * 4.5}`,
        );
      if (root.dataset.state === 'playing') complete();
    }
    function motion() {
      if (motionDisabled()) complete();
    }
    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(map);
    narrow.addEventListener('change', layout);
    window.addEventListener('portfoliomotionchange', motion);
    motion();
    return () => {
      cancel();
      observer.disconnect();
      narrow.removeEventListener('change', layout);
      window.removeEventListener('portfoliomotionchange', motion);
    };
  }, []);
  return (
    <section
      ref={section}
      id="request-pipeline"
      className="pipeline-section"
      aria-labelledby="pipeline-title"
      data-state={state}
    >
      <div className="container">
        <div className="section-heading-row">
          <h2 id="pipeline-title" className="home-section-title">
            <span className="section-word" aria-hidden="true">
              FLOW
            </span>
            Watch a request run
          </h2>
          <div className="pipeline-actions">
            <button
              id="pipelineRun"
              className="btn btn-primary"
              type="button"
              onClick={run}
            >
              <Icon name="play" /> Run
            </button>
            <span>Scripted replay</span>
          </div>
        </div>
        <p className="pipeline-intro">
          A scripted replay of LSFM AI HQ’s request flow.
        </p>
        {children}
      </div>
    </section>
  );
}
