"""
Basic tests for VirtuVerse package initialization.
"""
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


def test_package_import():
    """Test that the virtuverse package can be imported."""
    try:
        import virtuverse
        assert virtuverse is not None
    except ImportError as e:
        raise AssertionError(f"Failed to import virtuverse package: {e}")


def test_package_version():
    """Test that the package version is defined."""
    import virtuverse
    assert hasattr(virtuverse, '__version__')
    assert virtuverse.__version__ == "1.0.0"


def test_package_metadata():
    """Test that package metadata is properly defined."""
    import virtuverse
    assert hasattr(virtuverse, '__author__')
    assert hasattr(virtuverse, '__license__')
    assert virtuverse.__author__ == "Bosch"
    assert virtuverse.__license__ == "ISC"


if __name__ == "__main__":
    # Run tests manually if pytest is not available
    test_package_import()
    print("✓ test_package_import passed")
    
    test_package_version()
    print("✓ test_package_version passed")
    
    test_package_metadata()
    print("✓ test_package_metadata passed")
    
    print("\nAll tests passed!")
