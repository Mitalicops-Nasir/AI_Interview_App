import React from "react";

interface CategoryScoresProps {
  Index: number;
  feedback: Feedback;
  NumberOfPoints: number;
}

const CategoryScores = ({
  Index,
  feedback,
  NumberOfPoints,
}: CategoryScoresProps) => {
  const splitCommentIntoLines = (comment: string | undefined) => {
    return comment
      ?.split(". ")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  return (
    <div className="mb-5 flex flex-col">
      <div>
        <div>
          <h3 className="font-bold text-[18px]">
            {NumberOfPoints}. {feedback?.categoryScores[Index].name} (
            {feedback?.categoryScores[Index].score}/100)
          </h3>
        </div>

        <div className="ml-5">
          {splitCommentIntoLines(feedback?.categoryScores[Index].comment)?.map(
            (line, index) => (
              <p key={index} className="m-2">
                {" "}
                • {line}.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryScores;
