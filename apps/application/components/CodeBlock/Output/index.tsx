"use client";
import GetProject from "../../../actions/project";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { BatteryCharging, CheckCircle, Circle, Dot, X } from "lucide-react";
import React from "react";
import dynamic from "next/dynamic";
import { StepBlockInterface } from "../Editor";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

const Output = ({ id, response, error }: StepBlockInterface) => {
  const [activeTab, setActiveTab] = React.useState("output");

  return (
    <div className="border-t border-blue-500  w-full h-full">
      <Tabs defaultValue="output" className="flex flex-col h-full w-full">
        <div className="flex  w-full mx-2">
          <TabsList className="relative flex px-1 py-1 gap-1 bg-white/20 rounded-full w-fit mt-2">
            <TabsTrigger
              value="output"
              className={cn(
                "text-sm font-bold px-2  rounded-full hover:bg-white/10",
                activeTab === "output" && "bg-white/20"
              )}
              onClick={() => setActiveTab("output")}
            >
              {/* <BatteryCharging size={20} className="text-blue-400" /> */}
              <span>Output</span>
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className={cn(
                "text-sm font-bold px-2  rounded-full hover:bg-white/10",
                activeTab === "code" && "bg-white/20"
              )}
              onClick={() => setActiveTab("code")}
            >
              Executed Code
            </TabsTrigger>
            <TabsTrigger
              value="stdout"
              className={cn(
                "text-sm font-bold px-2  rounded-full hover:bg-white/10",
                activeTab === "stdout" && "bg-white/20"
              )}
              onClick={() => setActiveTab("stdout")}
            >
              Console
            </TabsTrigger>
          </TabsList>
          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-2 pr-5">
              {error ? (
                <div className="relative">
                  <Circle size={22} className="text-red-500" />
                  <X
                    size={20}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500"
                  />
                </div>
              ) : (
                <CheckCircle size={20} className="text-green-500" />
              )}

              <div className="flex items-center">
                <span
                  className={cn(
                    "text-sm font-bold",
                    error ? "text-red-500" : "text-green-500"
                  )}
                >
                  {error ? "Failed Action" : "Success"}
                </span>{" "}
                {/* <Dot size={15} className="text-green-500" /> */}
                {/* <div className="text-sm ">10ms</div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex-1 h-full w-full">
          <div
            className={cn(
              "absolute inset-2 rounded-md  ",
              error ? "bg-[#8b1d1d]" : "bg-white/10"
            )}
          >
            <div
              className={cn(
                "absolute inset-1 flex items-start p-3 rounded-md bg-[#0b1c2c]  overflow-y-auto "
              )}
            >
              <TabsContent value="output">
                <ReactJson
                  src={error ? { Error: error } : response}
                  shouldCollapse={false}
                  name={false}
                  theme={"harmonic"}
                  indentWidth={5}
                  displayObjectSize={true}
                  enableClipboard={false}
                  displayDataTypes={false}
                  sortKeys={false}
                  iconStyle="square"
                  style={{
                    fontSize: "13px",
                    fontFamily: "monospace",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </TabsContent>
              <TabsContent value="code">
                <div className="h-full text-base font-mono text-white/80 hover:text-white">
                  <div className="text-sm text-muted-foreground">
                    Executed Code
                  </div>
                  {/* {output} */}
                </div>
              </TabsContent>
              <TabsContent value="stdout">
                <div className="h-full text-base font-mono text-white/80 hover:text-white">
                  <div className="text-sm text-muted-foreground">
                    Console Output
                  </div>
                  {/* {output} */}
                </div>
              </TabsContent>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Output;
