import React, { useState } from "react";
import VotingModal from "./VotingModal";
import "./styles/CriteriaSection.scss";
import type { Criteria } from "../mocks/criteria";
import { teachers, type Teacher } from "../mocks/teachers";
import plus from "/plus.svg";

interface CriteriaSectionProps {
  criteria: Criteria;
  index: number;
}

const CriteriaSection: React.FC<CriteriaSectionProps> = ({
  criteria,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [votedTeachers, setVotedTeachers] = useState<Teacher[]>([]);

  const handleVote = (selectedIds: number[]) => {
    const selectedTeachers = teachers.filter((t) => selectedIds.includes(t.id));
    setVotedTeachers(selectedTeachers);
    setIsModalOpen(false);
  };

  const formatTeacherName = (t: Teacher): string =>
    `${t.lastName} ${t.firstName[0]}.${t.patronymic[0]}.`;

  const buttonText =
    votedTeachers.length > 0 ? "Изменить выбор" : "Проголосовать";

  return (
    <div className="criteriaSection">
      <div className="header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="leftPart">
          <span className="number">(0{index})</span>
          <span>{criteria.title}</span>
        </div>

        <img
          className={isExpanded ? "action active" : "action"}
          src={plus}
          alt="plus"
        />
      </div>
      {isExpanded && (
        <div className="expandedContent">
          <div className="photo">
            <img src={criteria.photoUrl} alt="критерий" />
          </div>
          <div className="info">
            <div className="infoMore">
              <p>{criteria.description}</p>
              {votedTeachers.length > 0 && (
                <div className="votedList">
                  {votedTeachers.map((t) => (
                    <span key={t.id} className="votedItem">
                      {formatTeacherName(t)}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button className="voteButton" onClick={() => setIsModalOpen(true)}>
              {buttonText}
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <VotingModal
          teachers={teachers}
          onVote={handleVote}
          onCancel={() => setIsModalOpen(false)}
          initialSelectedIds={votedTeachers.map((t) => t.id)}
        />
      )}
    </div>
  );
};

export default CriteriaSection;
