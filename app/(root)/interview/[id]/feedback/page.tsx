import CategoryScores from "@/components/CategoryScores";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.actions";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const FeedbackPage = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);

  if (!interview) return redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  const FeedbackStyle =
    feedback?.totalScore! > 50 ? "text-green-400" : "text-red-400";

  console.log(feedback);
  return (
    <section className="section-feedback">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold">
          Feedback on the Interview -{" "}
          <span className="capitalize">{interview.role}</span> Interview
        </h1>
      </div>

      <div className="flex flex-row justify-center ">
        <div className="flex flex-row gap-5">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>
              Overall Impression:{" "}
              <span className="text-primary-200 font-bold">
                {feedback?.totalScore}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div>
        <h1 className="font-bold text-[30px] mb-7">Breakdown of Evaluation:</h1>

        <CategoryScores Index={0} feedback={feedback!} NumberOfPoints={1} />
        <CategoryScores Index={1} feedback={feedback!} NumberOfPoints={2} />
        <CategoryScores Index={2} feedback={feedback!} NumberOfPoints={3} />
      </div>

      <div className="flex flex-col gap-3">
        <h3>Strengths</h3>
        <ul>
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3>Areas for Improvement</h3>
        <ul>
          {feedback?.areasForImprovement?.map((area, index) => (
            <li className="mb-2" key={index}>
              {area}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-2">
          <p className="font-bold text-[22px] text-white">Final Verdict: </p>

          <p
            className={cn(
              `p-1 rounded-[30px] px-4 py-1 bg-dark-200 font-bold ${FeedbackStyle}`
            )}
          >
            {feedback?.totalScore! > 50 ? "Recomended" : "Not Recommended"}
          </p>
        </div>

        <p>{feedback?.finalAssessment}</p>
      </div>

      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-black text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FeedbackPage;
