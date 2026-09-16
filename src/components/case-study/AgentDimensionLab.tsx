"use client";

import { useId, useState } from "react";
import { Check, RotateCcw, ShieldCheck } from "lucide-react";

type DimensionId = "goal" | "behavior" | "trust" | "power" | "learning";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent";
const buttonBase = `min-h-11 rounded-lg px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${focusRing}`;

function GoalLab() {
  const items = ["体验节奏不过度紧张", "预算保持在约定范围", "关键预订前由我确认"];
  const [checked, setChecked] = useState([true, false, false]);
  const [confirmed, setConfirmed] = useState(false);
  const groupId = useId();
  const complete = checked.every(Boolean);
  return <div className="space-y-5">
    <div><p className="text-xs font-bold text-neutral-500">共同目标</p><p className="mt-2 text-base font-semibold leading-7 text-neutral-900">在明确预算与节奏的前提下，完成一段可调整的旅行计划。</p></div>
    <fieldset className="space-y-2" aria-describedby={`${groupId}-hint`}><legend className="text-sm font-bold text-neutral-800">成功标准</legend>{items.map((item, index) => <label key={item} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg bg-white px-3 py-2 text-sm text-neutral-700"><input type="checkbox" checked={checked[index]} onChange={() => { setConfirmed(false); setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value)); }} className="h-5 w-5 accent-[#2e94e3]" /><span>{item}</span></label>)}</fieldset>
    <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-amber-50 p-4"><strong className="text-sm text-amber-950">需要权衡</strong><p className="mt-1 text-xs leading-5 text-amber-900">短期便利 ↔ 长期预算</p></div><div className="rounded-xl bg-blue-50 p-4"><strong className="text-sm text-blue-950">下一里程碑</strong><p className="mt-1 text-xs leading-5 text-blue-900">确认目标后生成两套方案</p></div></div>
    <p id={`${groupId}-hint`} className="text-xs leading-5 text-neutral-500" aria-live="polite">{confirmed ? "共同目标已确认。Agent 现在可以进入方案阶段。" : complete ? "所有成功标准已确认，可以继续。" : "确认全部成功标准后，Agent 才能继续。"}</p>
    <button type="button" disabled={!complete || confirmed} onClick={() => setConfirmed(true)} className={`${buttonBase} w-full bg-neutral-900 text-white hover:bg-workspace-accent`}>{confirmed ? <span className="inline-flex items-center gap-2"><Check className="h-4 w-4" />共同目标已确认</span> : "确认共同目标"}</button>
  </div>;
}

function BehaviorLab() {
  const [state, setState] = useState<"ready" | "paused" | "confirmed" | "rolledBack">("ready");
  return <div className="space-y-5"><div className="grid grid-cols-3 gap-2 text-center text-xs font-bold"><span className="rounded-lg bg-emerald-50 px-2 py-3 text-emerald-800">可自动执行</span><span className="rounded-lg bg-blue-50 px-2 py-3 text-blue-800">需要确认</span><span className="rounded-lg bg-red-50 px-2 py-3 text-red-800">禁止执行</span></div><ol className="space-y-2 text-sm text-neutral-700"><li className="rounded-lg bg-white p-3">1. 整理合同草稿 <strong className="float-right text-emerald-700">完成</strong></li><li className="rounded-lg bg-blue-50 p-3">2. 发出合同 <strong className="float-right text-blue-700">检查点</strong></li><li className="rounded-lg bg-white p-3">3. 发起付款 <strong className="float-right text-neutral-500">等待</strong></li></ol><p className="text-sm font-medium text-neutral-800" aria-live="polite">当前状态：{{ready:"等待人工确认",paused:"任务已暂停",confirmed:"已确认，继续执行",rolledBack:"已回滚到合同草稿"}[state]}</p><div className="grid gap-2 sm:grid-cols-3"><button type="button" onClick={() => setState("paused")} className={`${buttonBase} border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50`}>暂停任务</button><button type="button" onClick={() => setState("confirmed")} className={`${buttonBase} bg-workspace-accent text-white hover:bg-blue-700`}>请求确认</button><button type="button" onClick={() => setState("rolledBack")} className={`${buttonBase} bg-neutral-900 text-white hover:bg-neutral-700`}>回滚</button></div></div>;
}

function TrustLab() {
  const [explanation, setExplanation] = useState(false); const [choice, setChoice] = useState("尚未应用");
  return <div className="space-y-5"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold text-neutral-500">当前状态</p><p className="mt-1 font-semibold text-neutral-900">正在协调日程</p></div><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">发现预期外变更</span></div><div className="rounded-xl bg-white p-4"><strong className="text-sm text-neutral-900">变更预览</strong><p className="mt-2 text-sm text-neutral-600">需求评审：16:00 → 15:30</p><button type="button" onClick={() => setExplanation((value) => !value)} aria-expanded={explanation} className={`${buttonBase} mt-3 border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50`}>{explanation ? "收起原因" : "为什么这样做？"}</button>{explanation ? <div className="mt-3 space-y-2 text-xs leading-5 text-neutral-600"><p><strong>观察：</strong>新会议与评审冲突。</p><p><strong>原因：</strong>调整可保留核心沟通时段。</p><p><strong>不确定性：</strong>尚未确认所有参会者是否方便。</p></div> : null}</div><p className="text-xs text-neutral-500" aria-live="polite">处理结果：{choice}</p><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setChoice("已确认并应用")} className={`${buttonBase} bg-workspace-accent text-white hover:bg-blue-700`}>确认并应用</button><button type="button" onClick={() => setChoice("保持原日程")} className={`${buttonBase} border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50`}>暂不调整</button></div></div>;
}

function PowerLab() {
  const permissions = ["行动权", "感知权", "数据权", "经济权", "社交权"];
  const [allowed, setAllowed] = useState([true, true, false, false, false]); const [authorized, setAuthorized] = useState(false);
  return <div className="space-y-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{permissions.map((permission, index) => <label key={permission} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-neutral-700"><input type="checkbox" checked={allowed[index]} onChange={() => { setAuthorized(false); setAllowed((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value)); }} className="h-5 w-5 accent-[#2e94e3]" />{permission}</label>)}</div><div className="rounded-xl bg-violet-50 p-4 text-sm leading-6 text-violet-950"><div className="flex gap-2"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" /><p><strong>人类确认关口：</strong>经济权或社交权开启时，每次执行都必须确认。最终决策权属于用户。</p></div></div><p className="text-xs text-neutral-500" aria-live="polite">{authorized ? "本次授权已记录到审计与责任链。" : "尚未授权；Agent 不会执行高风险动作。"}</p><button type="button" onClick={() => setAuthorized(true)} className={`${buttonBase} w-full bg-neutral-900 text-white hover:bg-workspace-accent`}>确认本次授权</button></div>;
}

function LearningLab() {
  const [level, setLevel] = useState(2); const [status, setStatus] = useState("建议尚未应用");
  return <div className="space-y-5"><label className="block text-sm font-bold text-neutral-800">自主行动级别：{["保守", "适度辅助", "较自主", "更自主"][level - 1]}<input type="range" min="1" max="4" value={level} onChange={(event) => { setLevel(Number(event.target.value)); setStatus("建议尚未应用"); }} className="mt-3 h-11 w-full accent-[#2e94e3]" /></label><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-white p-4"><strong className="text-sm text-neutral-900">当前行为</strong><p className="mt-2 text-xs leading-5 text-neutral-600">关键节点逐项确认</p></div><div className="rounded-xl bg-blue-50 p-4"><strong className="text-sm text-blue-950">建议调整</strong><p className="mt-2 text-xs leading-5 text-blue-900">集中确认低风险步骤</p></div></div><div className="rounded-xl bg-red-50 p-4 text-xs leading-5 text-red-900"><strong>策略漂移：</strong>最近的直接给方案行为与“先分析后建议”的既有偏好不一致。</div><p className="text-xs text-neutral-500" aria-live="polite">{status}</p><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setStatus("已纠正该学习假设")} className={`${buttonBase} bg-workspace-accent text-white hover:bg-blue-700`}>纠正假设</button><button type="button" onClick={() => { setLevel(2); setStatus("学习记录已重置"); }} className={`${buttonBase} inline-flex items-center justify-center gap-2 border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50`}><RotateCcw className="h-4 w-4" />重置学习</button></div></div>;
}

export default function AgentDimensionLab({ id }: { id: DimensionId }) {
  return <div className="rounded-2xl bg-[#f1eee8] p-5 sm:p-6">{{ goal: <GoalLab />, behavior: <BehaviorLab />, trust: <TrustLab />, power: <PowerLab />, learning: <LearningLab /> }[id]}</div>;
}
