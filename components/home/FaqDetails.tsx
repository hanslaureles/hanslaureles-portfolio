import { questions } from '../../lib/home';

export default function FaqDetails() {
  return (
    <>
      {questions.map((item) => (
        <details key={item.label}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </>
  );
}
