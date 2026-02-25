import React, { useState, useMemo } from "react";
import "./styles/VotingModal.scss";
import type { Teacher } from "../mocks/teachers";

interface VotingModalProps {
  teachers: Teacher[];
  onVote: (selectedIds: number[]) => void;
  onCancel: () => void;
  initialSelectedIds?: number[];
}

const VotingModal: React.FC<VotingModalProps> = ({
  teachers,
  onVote,
  onCancel,
  initialSelectedIds = [],
}) => {
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<number[]>(initialSelectedIds);

  const selectedTeachers = useMemo(
    () => teachers.filter((t) => selected.includes(t.id)),
    [teachers, selected],
  );

  const unselectedTeachers = useMemo(
    () => teachers.filter((t) => !selected.includes(t.id)),
    [teachers, selected],
  );

  const sortedSelected = useMemo(
    () =>
      [...selectedTeachers].sort((a, b) =>
        a.lastName.localeCompare(b.lastName),
      ),
    [selectedTeachers],
  );

  const filteredUnselected = useMemo(() => {
    if (!search.trim()) return [];
    return unselectedTeachers
      .filter((t) =>
        `${t.lastName} ${t.firstName} ${t.patronymic}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
      .sort((a, b) => a.lastName.localeCompare(b.lastName));
  }, [unselectedTeachers, search]);

  const displayedTeachers = useMemo(
    () => [...sortedSelected, ...filteredUnselected],
    [sortedSelected, filteredUnselected],
  );

  const handleToggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleVote = () => {
    const hasPreviousVotes = initialSelectedIds.length > 0;
    const message = hasPreviousVotes
      ? "Вы уверены, что хотите изменить свой голос?"
      : "Вы уверены, что хотите проголосовать?";
    if (window.confirm(message)) {
      onVote(selected);
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContainer size-large">
        <div className="modalHeader">
          <h2>Выберите преподавателей</h2>
        </div>
        <div className="modalBody">
          <div className="votingContent">
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="searchInput"
            />
            <div className="teacherList">
              {displayedTeachers.length > 0 ? (
                displayedTeachers.map((t) => (
                  <div
                    key={t.id}
                    className={`teacherItem ${selected.includes(t.id) ? "selected" : ""}`}
                  >
                    <label>
                      <div className="">
                        {`${t.lastName} ${t.firstName} ${t.patronymic} `}
                        <span className="teacherPosition">{t.position}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={selected.includes(t.id)}
                        onChange={() => handleToggle(t.id)}
                      />
                    </label>
                  </div>
                ))
              ) : (
                <div className="emptyMessage">Ничего не найдено</div>
              )}
            </div>
          </div>
        </div>
        <div className="modalFooter">
          <div className="actionButtons">
            <button className="button primary" onClick={handleVote}>
              {initialSelectedIds.length > 0
                ? "Изменить голос"
                : "Проголосовать"}
            </button>
            <button className="button" onClick={onCancel}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingModal;
