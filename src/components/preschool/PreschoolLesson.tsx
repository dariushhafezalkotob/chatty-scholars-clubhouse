
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, Star } from 'lucide-react';

interface PreschoolLessonProps {
  subjectId: string;
  lessonNumber: number;
  onBack: () => void;
  onComplete: () => void;
}

const PreschoolLesson = ({ subjectId, lessonNumber, onBack, onComplete }: PreschoolLessonProps) => {
  const [currentPhase, setCurrentPhase] = useState<'video' | 'game' | 'complete'>('video');
  const [isPlaying, setIsPlaying] = useState(false);

  const getLessonContent = () => {
    const lessons = {
      math: {
        video: {
          title: '🔢 Counting Adventure!',
          story: 'Once upon a time, there was a little bunny who loved to count carrots...',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        },
        game: {
          title: '🎯 Count the Objects!',
          description: 'Help the bunny count all the carrots!'
        }
      },
      science: {
        video: {
          title: '🌱 Growing Plants!',
          story: 'Let me tell you about how tiny seeds become big, beautiful plants...',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        },
        game: {
          title: '🌿 Plant the Seeds!',
          description: 'Help water the plants and watch them grow!'
        }
      },
      english: {
        video: {
          title: '📖 Letter Adventure!',
          story: 'Come along on a magical journey through the land of letters...',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
        },
        game: {
          title: '🔤 Find the Letters!',
          description: 'Can you find all the hidden letters?'
        }
      }
    };

    return lessons[subjectId as keyof typeof lessons] || lessons.math;
  };

  const lesson = getLessonContent();

  const handleVideoComplete = () => {
    setCurrentPhase('game');
  };

  const handleGameComplete = () => {
    setCurrentPhase('complete');
  };

  const renderVideo = () => (
    <div className="text-center">
      <h2 className="font-comic text-3xl font-bold text-white mb-6 drop-shadow-lg">
        {lesson.video.title}
      </h2>
      
      <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-6 mb-6">
        <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-4">
          {!isPlaying ? (
            <Button
              size="lg"
              onClick={() => setIsPlaying(true)}
              className="rounded-full w-20 h-20 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Play className="w-8 h-8 text-white" />
            </Button>
          ) : (
            <div className="text-white font-comic text-xl p-8">
              📺 Playing story video...
              <br />
              <small>{lesson.video.story}</small>
            </div>
          )}
        </div>
        
        {isPlaying && (
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsPlaying(false)}
              className="rounded-full"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
            <Button
              onClick={handleVideoComplete}
              className="rounded-full bg-green-500 hover:bg-green-600"
            >
              Story Finished! Play Game →
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderGame = () => (
    <div className="text-center">
      <h2 className="font-comic text-3xl font-bold text-white mb-6 drop-shadow-lg">
        {lesson.game.title}
      </h2>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 mb-6">
        <p className="font-comic text-xl text-white mb-6">
          {lesson.game.description}
        </p>
        
        {/* Simple interactive game area */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="aspect-square bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              onClick={() => {
                // Simple game interaction
                if (item === 6) handleGameComplete();
              }}
            >
              <span className="text-4xl">
                {subjectId === 'math' && '🥕'}
                {subjectId === 'science' && '🌱'}
                {subjectId === 'english' && String.fromCharCode(64 + item)}
              </span>
            </div>
          ))}
        </div>
        
        <p className="font-comic text-white/80">
          Click on the items to play! 🎮
        </p>
      </div>
    </div>
  );

  const renderComplete = () => (
    <div className="text-center">
      <h2 className="font-comic text-4xl font-bold text-white mb-6 drop-shadow-lg animate-bounce">
        🎉 Great Job! 🎉
      </h2>
      
      <div className="bg-gradient-to-br from-green-400 to-blue-400 rounded-3xl p-8 mb-6">
        <div className="text-6xl mb-4">⭐</div>
        <p className="font-comic text-xl text-white mb-6">
          You completed the lesson! You're amazing! 🌟
        </p>
        
        <div className="flex justify-center space-x-4">
          <Button
            onClick={onComplete}
            className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-lg px-8 py-4"
          >
            🏠 Back to Lessons
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <ArrowLeft className="h-6 w-6 text-white" />
          </Button>
          <div className="flex items-center space-x-2">
            <span className="font-comic text-xl text-white">Lesson {lessonNumber}</span>
            <div className="flex space-x-1">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    (step === 1 && currentPhase !== 'video') ||
                    (step === 2 && (currentPhase === 'complete' || currentPhase === 'game')) ||
                    (step === 3 && currentPhase === 'complete')
                      ? 'bg-yellow-400'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {currentPhase === 'video' && renderVideo()}
        {currentPhase === 'game' && renderGame()}
        {currentPhase === 'complete' && renderComplete()}

        {/* Fun decorative elements */}
        <div className="fixed bottom-4 right-4 text-4xl animate-bounce">
          {currentPhase === 'video' && '📺'}
          {currentPhase === 'game' && '🎮'}
          {currentPhase === 'complete' && '🏆'}
        </div>
      </div>
    </div>
  );
};

export default PreschoolLesson;
