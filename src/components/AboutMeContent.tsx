"use client";

import React from "react";
import { User, Shield, Compass, ChevronRight, GraduationCap, Briefcase } from "lucide-react";
import type { ProfileContent } from "@/types/content";

interface AboutMeContentProps {
  profile: ProfileContent;
}

export default function AboutMeContent({ profile }: AboutMeContentProps) {
  return (
    <div className="space-y-8 select-text" data-component="AboutMeContent">
      {/* Bio Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start pb-6 border-b border-neutral-100">
        <div className="w-16 h-16 rounded-full bg-[#373737] flex-shrink-0 flex items-center justify-center text-white">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-neutral-800">{profile.name.full}</h2>
          <p className="text-xs font-mono text-neutral-400">{profile.title}</p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-2">{profile.bio}</p>
        </div>
      </div>

      {/* Focus Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-neutral-50 border border-neutral-200/60 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-neutral-800">
            <Compass className="w-4 h-4 text-sky-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono">{profile.philosophy.heading}</h3>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">{profile.philosophy.body}</p>
        </div>

        <div className="p-4 bg-neutral-50 border border-neutral-200/60 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-neutral-800">
            <Shield className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono">{profile.aiThinking.heading}</h3>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">{profile.aiThinking.body}</p>
        </div>
      </div>

      {/* Core Skillset Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5" />
          {profile.competenciesHeading}
        </h3>
        <div className="border border-neutral-200/60 rounded-xl overflow-hidden divide-y divide-neutral-100 bg-white">
          {profile.skills.map((skill, index) => (
            <div key={index} className="flex justify-between items-center p-3 text-xs">
              <span className="font-medium text-neutral-700">{skill.name}</span>
              <span className="font-mono text-neutral-400 text-[10px]">{skill.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones / Timeline */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5" />
          {profile.chronologyHeading}
        </h3>
        <div className="relative pl-4 border-l border-neutral-200 space-y-6">
          {profile.experience.map((item, index) => (
            <div key={index} className="relative group">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white bg-neutral-400 group-hover:bg-sky-500 group-hover:border-sky-100 transition-colors" />
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">
                    {item.year}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-800">{item.company}</span>
                </div>
                <h4 className="text-sm font-bold text-neutral-700 mt-1">{item.role}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-neutral-100 flex justify-between items-center text-[10px] font-mono text-neutral-400">
        <span>{profile.footer.updated}</span>
        <span className="flex items-center gap-1 cursor-pointer hover:text-neutral-600">
          {profile.footer.cv} <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
