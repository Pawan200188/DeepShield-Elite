import torch
import torch.nn as nn

class VidyutLSTM(nn.Module):
    def __init__(self, num_classes=2):
        super(VidyutLSTM, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 16, kernel_size=7, padding=1),
            nn.BatchNorm2d(16),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),

            nn.Conv2d(16, 32, kernel_size=7, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),

            nn.Conv2d(32, 64, kernel_size=7, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),

            nn.Conv2d(64, 128, kernel_size=7, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2)
        )
        
        # LSTM Layer
        self.lstm = nn.LSTM(
            input_size=128 * 10 * 10,  # Adjust based on your feature size
            hidden_size=512,
            num_layers=1,
            batch_first=True
        )
        
        self.classifier = nn.Sequential(
            nn.Linear(512, 256),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(256, num_classes)
        )

    def forward(self, x):
        batch_size = x.size(0)
        x = self.features(x)
        x = x.view(batch_size, -1)  # Flatten
        x = x.unsqueeze(1)  # Add sequence dimension
        x, _ = self.lstm(x)  # Apply LSTM
        x = x.squeeze(1)  # Remove sequence dimension
        x = self.classifier(x)
        return x

def load_model(model_path):
    """Loads the trained VidyutLSTM model."""
    model = VidyutLSTM(num_classes=2)
    state_dict = torch.load(model_path, map_location=torch.device("cpu"))
    model.load_state_dict(state_dict)
    model.eval()
    return model
