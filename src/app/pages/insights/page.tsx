"use client";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5wc from "@amcharts/amcharts5/wc";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { removeStopwords } from "stopword";
import { supabase } from "../../../utils/supabaseClient";

export default function Insights() {
  const router = useRouter();
  const [combinedText, setCombinedText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("content")
        .eq("role", "user");

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      const allWords = data
        .map((msg) => msg.content)
        .join(" ")
        .split(/\s+/);
      const filteredWords = removeStopwords(allWords);
      const combinedText = filteredWords.join(" ");
      setCombinedText(combinedText);
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (combinedText) {
      const root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      const zoomableContainer = root.container.children.push(
        am5.ZoomableContainer.new(root, {
          width: am5.percent(100),
          height: am5.percent(100),
          wheelable: true,
          pinchZoom: true,
        })
      );

      const zoomTools = zoomableContainer.children.push(
        am5.ZoomTools.new(root, {
          target: zoomableContainer,
        })
      );

      const series = zoomableContainer.children.push(
        am5wc.WordCloud.new(root, {
          maxCount: 100,
          minWordLength: 2,
          maxFontSize: am5.percent(35),
          text: combinedText,
        })
      );

      series.labels.template.setAll({
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: "Courier New",
      });

      return () => {
        root.dispose();
      };
    }
  }, [combinedText]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <h1 className="text-2xl mb-4">Insights</h1>
      <div
        id="chartdiv"
        className="flex-grow"
        style={{ width: "100%", height: "100%" }}
      ></div>
    </div>
  );
}
