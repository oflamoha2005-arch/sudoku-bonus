import React, { useState } from 'react';

interface SudokuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 4x4 gentle mindful warmup grid
const INITIAL_GRID = [
  [1, 0, 3, 0],
  [0, 0, 0, 2],
  [3, 0, 0, 0],
  [0, 4, 0, 1],
];

const SOLUTION_GRID = [
  [1, 2, 3, 4],
  [4, 3, 1, 2],
  [2, 1, 4, 3],
  [3, 4, 2, 1],
];

export const SudokuModal: React.FC<SudokuModalProps> = ({ isOpen, onClose }) => {
  const [grid, setGrid] = useState<number[][]>(INITIAL_GRID);
  const [solved, setSolved] = useState(false);

  if (!isOpen) return null;

  const handleChange = (r: number, c: number, val: string) => {
    const num = parseInt(val, 10);
    const newGrid = grid.map((row, ri) =>
      row.map((cell, ci) => {
        if (ri === r && ci === c) {
          return isNaN(num) ? 0 : Math.min(Math.max(num, 1), 4);
        }
        return cell;
      })
    );
    setGrid(newGrid);

    // Check if matches solution or is validly filled
    const isCorrect = newGrid.every((row, ri) =>
      row.every((cell, ci) => cell === SOLUTION_GRID[ri][ci])
    );
    if (isCorrect) {
      setSolved(true);
    }
  };

  const handleReset = () => {
    setGrid(INITIAL_GRID);
    setSolved(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-card bg-[#F2A922]/95 border-2 border-white/60 max-w-md w-full rounded-[36px] p-6 sm:p-8 shadow-2xl relative text-[#131C24]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/40 hover:bg-white/70 flex items-center justify-center text-lg font-bold text-[#131C24] transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/40 text-xs font-black uppercase tracking-wider mb-2">
            <span>✦</span> Daily Warmup Challenge
          </div>
          <h3 className="text-2xl sm:text-3xl font-black">Zen Mindful Sudoku</h3>
          <p className="text-xs sm:text-sm text-[#131C24]/80 mt-1 font-medium">
            Fill numbers 1 to 4 in each row, column, and 2x2 box.
          </p>
        </div>

        {/* 4x4 Grid */}
        <div className="grid grid-cols-4 gap-2 max-w-[260px] mx-auto p-3 bg-white/30 rounded-2xl border border-white/40">
          {grid.map((row, r) =>
            row.map((val, c) => {
              const isInitial = INITIAL_GRID[r][c] !== 0;
              return (
                <input
                  key={`${r}-${c}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[1-4]*"
                  maxLength={1}
                  disabled={isInitial}
                  value={val === 0 ? '' : val}
                  onChange={(e) => handleChange(r, c, e.target.value)}
                  className={`w-12 h-12 text-center text-xl font-bold rounded-xl border transition-all ${
                    isInitial
                      ? 'bg-[#131C24] text-white border-transparent'
                      : 'bg-white/90 text-[#131C24] border-white focus:bg-white focus:ring-2 focus:ring-[#D95C14]'
                  }`}
                />
              );
            })
          )}
        </div>

        {solved && (
          <div className="mt-4 p-3 bg-[#A8E6CF] text-[#131C24] text-center font-bold text-xs sm:text-sm rounded-xl animate-bounce">
            🎉 Wonderful! You completed the mindful warm-up!
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-full bg-white/40 hover:bg-white/70 text-xs font-bold transition cursor-pointer"
          >
            Reset Grid
          </button>
          <button
            type="button"
            onClick={onClose}
            className="pill-press px-6 py-2.5 rounded-full bg-[#131C24] text-white text-xs font-bold shadow-pill hover:bg-black transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
