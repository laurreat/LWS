// Progress tracking system for SpeakRush
class ProgressTracker {
    constructor() {
        this.progressKey = "lwsProgress";
        this.loadProgress();
    }

    loadProgress() {
        const savedProgress = localStorage.getItem(this.progressKey);
        if (savedProgress) {
            this.progress = JSON.parse(savedProgress);
        } else {
            this.progress = {
                totalPoints: 0,
                levels: {
                    A1: { points: 0, completedGames: 0, bestScores: {} },
                    A2: { points: 0, completedGames: 0, bestScores: {} },
                    B1: { points: 0, completedGames: 0, bestScores: {} }
                },
                achievements: [],
                dailyStreak: 0,
                lastPlayed: null
            };
        }
    }

    saveProgress() {
        localStorage.setItem(this.progressKey, JSON.stringify(this.progress));
    }

    addPoints(level, gameName, points) {
        // Add points to total and level
        this.progress.totalPoints += points;
        this.progress.levels[level].points += points;
        
        // Update best score for this game if applicable
        if (!this.progress.levels[level].bestScores[gameName] || 
            points > this.progress.levels[level].bestScores[gameName]) {
            this.progress.levels[level].bestScores[gameName] = points;
        }
        
        this.saveProgress();
        return this.progress.totalPoints;
    }

    completeGame(level, gameName) {
        // Mark game as completed for this level if not already
        const completedGames = this.progress.levels[level].completedGames || 0;
        this.progress.levels[level].completedGames = completedGames + 1;
        this.saveProgress();
        
        // Check for achievements
        this.checkAchievements();
    }

    checkAchievements() {
        const newAchievements = [];
        
        // First timer achievement
        if (this.progress.totalPoints >= 10 && !this.hasAchievement("first_steps")) {
            newAchievements.push({
                id: "first_steps",
                name: "Primeros Pasos",
                description: "¡Ganaste tus primeros 10 puntos!",
                icon: "fa-baby",
                points: 10
            });
        }
        
        // Level starter achievements
        for (const level of ['A1', 'A2', 'B1']) {
            const achievementId = `level_${level.toLowerCase()}_starter`;
            if (this.progress.levels[level].completedGames >= 1 && 
                !this.hasAchievement(achievementId)) {
                newAchievements.push({
                    id: achievementId,
                    name: `Iniciador de ${level}`,
                    description: `¡Completaste tu primer juego en nivel ${level}!`,
                    icon: "fa-rocket",
                    points: 25
                });
            }
            
            // Level master achievements (5 games completed)
            const masterId = `level_${level.toLowerCase()}_master`;
            if (this.progress.levels[level].completedGames >= 5 && 
                !this.hasAchievement(masterId)) {
                newAchievements.push({
                    id: masterId,
                    name: `Maestro de ${level}`,
                    description: `¡Has completado 5 juegos en el nivel ${level}!`,
                    icon: "fa-trophy",
                    points: 50
                });
            }
        }
        
        // Points milestones
        const milestones = [100, 250, 500, 1000];
        for (const milestone of milestones) {
            const achievementId = `points_${milestone}`;
            if (this.progress.totalPoints >= milestone && 
                !this.hasAchievement(achievementId)) {
                newAchievements.push({
                    id: achievementId,
                    name: `${milestone} Puntos`,
                    description: `¡Has alcanzado los ${milestone} puntos!`,
                    icon: "fa-star",
                    points: milestone / 10
                });
            }
        }
        
        // Add new achievements and save
        if (newAchievements.length > 0) {
            this.progress.achievements.push(...newAchievements);
            this.saveProgress();
            return newAchievements;
        }
        
        return [];
    }

    hasAchievement(achievementId) {
        return this.progress.achievements.some(ach => ach.id === achievementId);
    }

    getAchievements() {
        return this.progress.achievements;
    }

    getTotalPoints() {
        return this.progress.totalPoints;
    }

    getLevelPoints(level) {
        return this.progress.levels[level].points;
    }

    getLevelCompletedGames(level) {
        return this.progress.levels[level].completedGames || 0;
    }

    getBestScore(level, gameName) {
        return this.progress.levels[level].bestScores[gameName] || 0;
    }

    updateDailyStreak() {
        const today = new Date().toDateString();
        const lastPlayed = this.progress.lastPlayed;
        
        if (lastPlayed === today) {
            // Same day, streak continues
            return this.progress.dailyStreak;
        } else if (lastPlayed) {
            // Check if yesterday
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastPlayed === yesterday.toDateString()) {
                // Consecutive day
                this.progress.dailyStreak += 1;
            } else {
                // Streak broken
                this.progress.dailyStreak = 1;
            }
        } else {
            // First day
            this.progress.dailyStreak = 1;
        }
        
        this.progress.lastPlayed = today;
        this.saveProgress();
        return this.progress.dailyStreak;
    }

    getDailyStreak() {
        return this.progress.dailyStreak;
    }
}

// Global instance
const progressTracker = new ProgressTracker();

// Export for use in other modules
window.progressTracker = progressTracker;