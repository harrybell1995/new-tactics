import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FormationEditor } from './FormationEditor';
import { FORMATION_TEMPLATES } from '../utils/formations';

interface Position {
  id: string;
  role: string;
  focus: string;
  x: number;
  y: number;
}

interface TacticFormData {
  tacticname: string;
  manager: string;
  year: string;
  formation: string;
  club: string;
  clubcountry: string;
  league: string;
  tacticalpreset: string;
  buildupstyle: string;
  defensiveapproach: string;
  notes: string;
  positions: Position[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TACTICAL_PRESETS = ['Balanced', 'Long Ball', 'Wing Play', 'Tiki Taka', 'Pressing', 'Park the Bus', 'Counter Attack'];
const BUILDUP_STYLES = ['Balanced', 'Counter', 'Short Passing'];
const DEFENSIVE_APPROACHES = ['Deep', 'Normal', 'High', 'Aggressive'];
const FORMATIONS = ['4-3-3', '4-4-2', '4-2-3-1', '3-5-2', '5-3-2'];

export const CreateTacticModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<TacticFormData>({
    tacticname: '',
    manager: '',
    year: new Date().getFullYear().toString(),
    formation: '4-3-3',
    club: '',
    clubcountry: '',
    league: '',
    tacticalpreset: 'Balanced',
    buildupstyle: 'Balanced',
    defensiveapproach: 'Normal',
    notes: '',
    positions: FORMATION_TEMPLATES['4-3-3'].positions
  });

  useEffect(() => {
    if (FORMATION_TEMPLATES[formData.formation]) {
      setFormData(prev => ({
        ...prev,
        positions: FORMATION_TEMPLATES[formData.formation].positions
      }));
    }
  }, [formData.formation]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create New Tactic</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tactic Name
              </label>
              <input
                type="text"
                name="tacticname"
                value={formData.tacticname}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Formation
              </label>
              <select
                name="formation"
                value={formData.formation}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
              >
                {FORMATIONS.map(formation => (
                  <option key={formation} value={formation}>{formation}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Manager
              </label>
              <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Year
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Club
              </label>
              <input
                type="text"
                name="club"
                value={formData.club}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Club Country
              </label>
              <input
                type="text"
                name="clubcountry"
                value={formData.clubcountry}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                League
              </label>
              <input
                type="text"
                name="league"
                value={formData.league}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tactical Preset
              </label>
              <select
                name="tacticalpreset"
                value={formData.tacticalpreset}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
              >
                {TACTICAL_PRESETS.map(preset => (
                  <option key={preset} value={preset}>{preset}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Build-up Style
              </label>
              <select
                name="buildupstyle"
                value={formData.buildupstyle}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
              >
                {BUILDUP_STYLES.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Defensive Approach
              </label>
              <select
                name="defensiveapproach"
                value={formData.defensiveapproach}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
              >
                {DEFENSIVE_APPROACHES.map(approach => (
                  <option key={approach} value={approach}>{approach}</option>
                ))}
              </select>
            </div>
          </div>

          <FormationEditor
            positions={formData.positions}
            onChange={(positions) => setFormData(prev => ({ ...prev, positions }))}
            formation={formData.formation}
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Create Tactic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};