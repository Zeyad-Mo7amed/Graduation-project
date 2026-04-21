import style from "./Loading.module.css";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <svg viewBox="0 0 240 240" height={300} width={300} className={style.pl}>
        {/* Ring A */}
        <circle
          strokeLinecap="round"
          strokeDashoffset={-330}
          strokeDasharray="0 660"
          strokeWidth={20}
          stroke="#000"
          fill="none"
          r={105}
          cy={120}
          cx={120}
          // هنا بنربط كلاسين مع بعض باستخدام Template Literals
          className={`${style.pl__ring} ${style["pl__ring--a"]}`}
        />

        {/* Ring B */}
        <circle
          strokeLinecap="round"
          strokeDashoffset={-110}
          strokeDasharray="0 220"
          strokeWidth={20}
          stroke="#000"
          fill="none"
          r={35}
          cy={120}
          cx={120}
          className={`${style.pl__ring} ${style["pl__ring--b"]}`}
        />

        {/* Ring C */}
        <circle
          strokeLinecap="round"
          strokeDasharray="0 440"
          strokeWidth={20}
          stroke="#000"
          fill="none"
          r={70}
          cy={120}
          cx={85}
          className={`${style.pl__ring} ${style["pl__ring--c"]}`}
        />

        {/* Ring D */}
        <circle
          strokeLinecap="round"
          strokeDasharray="0 440"
          strokeWidth={20}
          stroke="#000"
          fill="none"
          r={70}
          cy={120}
          cx={155}
          className={`${style.pl__ring} ${style["pl__ring--d"]}`}
        />
      </svg>
    </div>
  );
}
