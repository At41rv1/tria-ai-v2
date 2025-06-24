
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Zap, MessageSquare } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  const models = [
    {
      id: 'llama-3.1-8b-instant',
      name: 'A7 Fast',
      description: 'Quick responses',
      icon: Zap,
      color: 'text-orange-500'
    },
    {
      id: 'deepseek-r1-distill-llama-70b',
      name: 'A7 Long conversation',
      description: 'Detailed responses',
      icon: MessageSquare,
      color: 'text-blue-500'
    }
  ];

  const currentModel = models.find(m => m.id === selectedModel) || models[0];

  return (
    <div className="flex items-center space-x-2">
      <Bot className="text-gray-600" size={16} />
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-48 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <currentModel.icon className={`${currentModel.color} w-4 h-4`} />
              <span className="font-medium">{currentModel.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id} className="hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <model.icon className={`${model.color} w-4 h-4`} />
                <div>
                  <div className="font-medium">{model.name}</div>
                  <div className="text-xs text-gray-500">{model.description}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
